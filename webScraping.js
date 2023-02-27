
const cheerio=require('cheerio');
const axios=require('axios')

async function getBlogs(url){
    try{
        const response = await axios.get(url);
        const $=cheerio.load(response.data);
        let obj = {};
        const content=$('article');
        obj.title=$(content).find('h1.post-full-title').text().trim();
        obj.author=$(content).find('.author-card-content-no-bio').text().trim();
        obj.time=$(content).find('time').text().trim();
        obj.tag=$(content).find('header a').text().trim();
        obj.summary=$(content).find('.post-content p').text();
         
        return obj;
    }catch(err){
        console.log(err);
        return null;
    }
}


module.exports=getBlogs;