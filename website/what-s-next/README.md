
## 🚀 Start Developing

1.  **Use Gatsby to startup the site**

    Use the Gatsby CLI to build the website.

    ```shell
    # if you don't have gatsby installed already
    npm install -g gatsby-cli
    cd what-s-next
    gatsby develop
    ```
    Alternatively, you can try only with npm (I haven't tested this!)
    ```shell
    # 
    cd what-s-next
    npm install
    npm run develop
    ```

2.  **Open Chrome without CORS**

    I use terminal on MacOS to supress web security.  A better way is to host with a non-localhost url, but for testing I went this because it's simplier.

    ```shell
    open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
    ```
    Navigate to http://localhost:8000
    
    WARNING: THIS DOES HAVE A SECURITY RISK. MAKE SURE TO RE-ENABLE WHEN GOING BACK TO NORMAL TASKS> 
    
3.  **Run the socket.io server**

    Depending you might not need to npm init (especially not after the first time).  Without the server, the two users cannot connect. 
    
    ```shell
    # 
    cd server
    npm init
    node server.js
    ```
   

## 🚀 Learn more about gatsby

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
