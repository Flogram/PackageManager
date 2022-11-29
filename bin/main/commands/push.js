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
    const commitData = {
        name: message || 'Default push message',
        patches:[]
    }
    const emptyStr = ""
    for(let i= 0; i< files.length; i++){
        const data = await fs.readFileSync(files[i], 'utf8')
        commitData.patches.push({
            path: files[i]?.replace(process.cwd(),emptyStr),
            type: "create",
            data
        })
    }
    console.log(commitData);
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


    for (const item of items) {
        if (item.isDirectory()) {
            console.log(item.name);
            if (!content.folders?.includes(item.name) || item.name != "node_modules")
                files = [
                    ...files,
                    ...(await getFileList(`${dirName}/${item.name}`)),
                ];
        } else {
            // if (!content?.files?.includes(item.name) && !foundInExtensions(content?.extensions, item.name)){
            files.push(`${dirName}/${item.name}`);
        // }
        }
    }

    return files;
};

const foundInExtensions = (extensions, filename) =>{

    for(let i = 0; i < extensions.length || 0; i++){
        if(filename.endsWith(extensions[i]))
            return true
    }
    return false;
}
module.exports = {
    push
}