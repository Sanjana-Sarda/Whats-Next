import pandas as pd
import json

def inimovie(nservices, ngenres):
    data = {}

    ds = pd.read_csv("Files/MoviesOnStreamingPlatforms_updated.csv")
    ds = ds.iloc[:, 1:]    #remove unnamed index column
    
    ds.drop(['Age', 'Directors', 'Country', 'Language', 'Runtime'] + nservices, axis =1, inplace=True)
    ds.dropna(subset=['Genres'], inplace = True)
    ds.reset_index(inplace=True, drop=True)
    ds.Year = ds.Year.astype("object")
    ds['Rotten Tomatoes'] = ds['Rotten Tomatoes'].str.rstrip('%').astype('float') / 100.0
    
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