async function getBlogs(url){
    try{
        const responce=await axios.get(url);
       
        const $=cheerio.load(responce.data);
        
             const content=$('article');
             
          
                title=$(content).find('h1.post-full-title').text().trim();
                author=$(content).find('.author-card-content-no-bio').text().trim();
                time=$(content).find('time').text().trim();
                tag=$(content).find('header a').text().trim();
                summary=$(content).find('.post-content p').text();
                
               
          const obj={
              author,
              title,
              time,
              tag,
              summary
          }
         
        return obj;
       
    }catch(err){
        console.log(err);
    return undefined;
    }
}


module.exports=getBlogs;