# Dealing with thousands of files
This repository provides an example of using queues to handle thousands of files.

### 🤖 How?

1.  **First, make it boom.**

    Clone this project, and install it's dependencies:

    ```sh
    git clone https://github.com/jonalvarezz/use-queues.git
    cd use-queue
    yarn
    ```

    💥 Let's start off by trying to generate 10,000 files asynchronously (parallel)

    ```sh
    yarn start
    ```

    It should have boomed, just like this: 
    <img width="807" alt="image" src="https://user-images.githubusercontent.com/2167222/87833679-ba01a980-c888-11ea-9beb-c26903816322.png">
    
1.  **Second, and finally, let's fix it.**

    Switch to the `make-it-queue` branch, which refactors the code to make use of [better-queue](https://www.npmjs.com/package/better-queue)

    ```sh
    git checkout -b make-it-queue origin/make-it-queue
    yarn
    yarn start
    ```

    It should have succeeded and thus, you should have 10,000 files now under the `data` folder.
    
    ```sh
    ls -l data | wc -l
    # -> 10000
    ```
    
    Compare the changes of the branches. Happy hacking!
    
