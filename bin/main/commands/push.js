const {
    default: chalk
} = require("chalk")
const fs = require('fs');
const {
    exit
} = require("process");
const prompts = require('prompts');

const push = async (message) => {
    const data = await parseIgnoreFile();
    fs.readFile(`${process.cwd()}/floignore.json`, async (err, data) => {
        if (err) {
            // throw err
            console.log(`\n` + chalk.red("Invalid Flogram Project ...."));
            exit()
        };
        let content = await JSON.parse(data);
       
    const files = await getFileList(content);
    files.forEach(element => {
        console.log(element);
    });
    console.log(`\n` +
        chalk.bgCyanBright.black(`Preparing files in all directiories... \t`)
    )

    return content;
})


}

const parseIgnoreFile = () => {
    fs.readFile(`${process.cwd()}/floignore.json`, async (err, data) => {
        if (err) {
            // throw err
            console.log(`\n` + chalk.red("Invalid Flogram Project ...."));
            exit()
        };
        let content = await JSON.parse(data);
        return content;
    })
}
const getFileList = async (content) => {
    let files = [];
    const dirName = process.cwd();
    const items = await fs.promises.readdir(dirName, {
        withFileTypes: true
    });

    console.log(content)

    for (const item of items) {
        if (item.isDirectory()) {
            console.log(item.name);
            if (!content.folders?.includes(item.name) || item.name != "node_modules")
                files = [
                    ...files,
                    ...(await getFileList(`${dirName}/${item.name}`)),
                ];
        } else {
            console.log("called", item.name)
            const found = foundInExtensions(content?.extensions, item.name);
            console.log(found)
            if (!content?.files?.includes(item.name) && !found){
            files.push(`${dirName}/${item.name}`);
        }
        }
    }

    return files;
};

const foundInExtensions = (extensions, filename) =>{

    extensions?.forEach(element => {
        // console.log(element, filename, filename.endsWith(element))
        if(filename.endsWith(element)){
        return true
    }
    });
    return false
}
module.exports = {
    push
}