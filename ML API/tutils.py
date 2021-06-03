from nltk.tokenize import RegexpTokenizer
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import hstack
from sklearn import preprocessing
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import json

def inimovie(nservices, ngenres):
    data = {}
    services = ['Netflix', 'Hulu', 'Prime Video', 'Disney+']

    ds = pd.read_csv("Files/MoviesOnStreamingPlatforms_updated.csv")
    ds = ds.iloc[:, 1:]    #remove unnamed index column
    
    ds.drop(['Age', 'Directors', 'Country', 'Language', 'Runtime', 'Year'] + nservices, axis =1, inplace=True)
    ds.dropna(subset=['Genres'], inplace = True)
    ds.reset_index(inplace=True, drop=True)
    ds['Rotten Tomatoes'] = ds['Rotten Tomatoes'].str.rstrip('%').astype('float') / 100.0

    service = [x for x in services if x not in nservices]
    index_names = ds[(ds[service] == 0).all(1)].index
    ds.drop(index_names, inplace = True)
    
    g = ds['Genres'].str.split(',').apply(pd.Series,1).stack()
    g.index = g.index.droplevel(-1)
    g.name = 'Genres'
    del ds['Genres']
    ds_genres = ds.join(g)
    index_names = ds_genres[ds_genres['Genres'].isin(ngenres)].index
    ds_genres.drop(index_names, inplace = True)

    sort = ds_genres.sort_values(by=['Rotten Tomatoes', 'IMDb'], ascending=[False, False])
    sort.drop(['Genres'], axis =1, inplace=True)
    sort = sort.drop_duplicates()
    data['first'] = sort.iloc[0]['Title']
    
    sort = ds_genres.sort_values(by=['IMDb', 'Rotten Tomatoes'], ascending=[False, False])
    sort.drop(['Genres'], axis =1, inplace=True)
    sort = sort.drop_duplicates()
    data['second'] = sort.iloc[0]['Title']

    json_data = json.dumps(data)

    return json_data


def recsmovie(nservices, ngenres, first, second, history):
    data = {}
    services = ['Netflix', 'Hulu', 'Prime Video', 'Disney+']

    ds = pd.read_csv("Files/MoviesOnStreamingPlatforms_updated.csv")
    ds = ds.iloc[:, 1:]    #remove unnamed index column
    
    ds.drop(['Age'] + nservices, axis =1, inplace=True)
    ds.dropna(subset=['IMDb', 'Directors', 'Genres', 'Country', 'Language', 'Runtime'], inplace = True)
    ds.reset_index(inplace=True, drop=True)
    ds.Year = ds.Year.astype("object")
    ds['Rotten Tomatoes'] = ds['Rotten Tomatoes'].str.rstrip('%').astype('float') / 100.0

    service = [x for x in services if x not in nservices]
    index_names = ds[(ds[service] == 0).all(1)].index
    ds.drop(index_names, inplace = True)
    
    g = ds['Genres'].str.split(',').apply(pd.Series,1).stack()
    g.index = g.index.droplevel(-1)
    g.name = 'GenresSplit'
    ds_genres = ds.join(g)
    ds_genres.drop(['Genres'], axis =1, inplace=True)
    index_names = ds_genres[ds_genres['GenresSplit'].isin(ngenres)].index
    ds.drop(index_names)

    index_names = ds[ds['Title'].isin(history)].index
    ds = ds.drop(index_names)
    ds = ds.reset_index()
    mat = preprocess(ds, service)

    #compute cosine similarity
    sig = cosine_similarity(mat, mat)
    #reverse maping of indices and titles
    indices = pd.Series(ds.index, index = ds['Title']).drop_duplicates()
    print(len(indices))

    data['first'] = ds['Title'].iloc[give_recomendation(first[0], first[1], indices, sig)]
    
    data['second'] = ds['Title'].iloc[give_recomendation(second[0], second[1], indices,  sig)]

    json_data = json.dumps(data)

    return json_data



def preprocess(ds, service):
    
    #combining all text columns
    # Selecting all object data type and storing them in list
    s = list(ds.select_dtypes(include=['object']).columns)
    
    
    # Removing ID and Title column
    s.remove("Title")
    
    # Joining all text/object columns using commas into a single column
    ds['all_text']= ds[s].apply(lambda x: ','.join(x.dropna().astype(str)),axis=1)

    # Creating a tokenizer to remove unwanted elements from our data like symbols and numbers
    token = RegexpTokenizer(r'[a-zA-Z]+')

    # Converting TfidfVector from the text
    cv = TfidfVectorizer(lowercase=True,stop_words='english',ngram_range = (1,1),tokenizer = token.tokenize)
    text_counts= cv.fit_transform(ds['all_text'])

    # Aelecting numerical variables
    nds = ds.select_dtypes(include=['float64',"int64"])

    # Scaling Numerical variables
    scaler = preprocessing.MinMaxScaler(feature_range=(0, 1))

    # Applying scaler on our data and converting i into a data frame
    ndsmx = pd.DataFrame((scaler.fit_transform(nds)))
    ndsmx.columns=nds.columns    

    # Adding our adding numerical variables in the TF-IDF vector
    IMDb = ndsmx.IMDb.values[:, None]
    X_train_dtm = hstack((text_counts, IMDb))

    RT = ndsmx['Rotten Tomatoes'].values[:, None]
    X_train_dtm = hstack((text_counts, RT))

    for item in service:
      thing = ndsmx[item].values[:, None]
      X_train_dtm = hstack((X_train_dtm, thing))
    
    Runtime = ndsmx.Runtime.values[:, None]
    X_train_dtm = hstack((X_train_dtm, Runtime))
    
    return X_train_dtm


def give_recomendation(title, rating, indices, sig):
    """return the index of series of indices"""
    #get the index corresponding to original_title
    idx = indices[title]
    
    #get the pairwise similarity scores
    sig_scores = list(enumerate(sig[idx]))
    
    #sort the movies
    sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)
    
    #scores of 10 most similar movies
    movie = [i[0] for i in sig_scores]
    if (rating == 4):
      movie_indices = movie[1]
    elif (rating == 3):
      movie_indices = movie[2]
    elif (rating == 2):
      movie_indices = [x for x in sig_scores if x[1] <= 0.75][0][0]
    else:
      movie_indices = [x for x in sig_scores if x[1] <= 0.5][0][0]
    #top 10 most similar movies
    return movie_indices#ds['Title'].iloc[movie_indices]