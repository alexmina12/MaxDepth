function getPage(url){
    try{
        if (url == "http://www.udacity.com/cs101x/index.html"){
            return  '<html> <body> This is a test page for learning to crawl! <p> It is a good idea to  <a href="http://www.udacity.com/cs101x/crawling.html">learn to crawl</a> before you try to  <a href="http://www.udacity.com/cs101x/walking.html">walk</a> or  <a href="http://www.udacity.com/cs101x/flying.html">fly</a>. </p> </body> </html> '
        } 
        else if( url == "http://www.udacity.com/cs101x/crawling.html"){
            return  '<html> <body> I have not learned to crawl yet, but I am quite good at  <a href="http://www.udacity.com/cs101x/kicking.html">kicking</a>. </body> </html>'
        }
        else if (url == "http://www.udacity.com/cs101x/walking.html"){
            return '<html> <body> I cant get enough  <a href="http://www.udacity.com/cs101x/index.html">crawling</a>! </body> </html>'
        }
        else if (url == "http://www.udacity.com/cs101x/flying.html"){
            return '<html> <body> The magic words are Squeamish Ossifrage! </body> </html>'
        }
    }catch{
        return ""
    }
    return ""
        
}
    
function getNextTarget(page){
    start_link = page.indexOf('<a href=')
    if (start_link == -1){
        return [null, 0]
    }
    start_quote = page.indexOf('"', start_link)
    end_quote = page.indexOf('"', start_quote+1)
    url = page.substring(start_quote+1, end_quote)
    return [url, end_quote]
}

function getAllLinks(page){
    links = []
    while (true){
        [url, endPos] = getNextTarget(page)
        if (url){ // getNextTarget found a url
            links.push(url)
            page = page.substring(endPos)
        } else { // getNextTarget didn't find any url | url = null
           break
        }
    }
    return links
}

function union(list1, list2){
    let allElements = list1.concat(list2)
    let resultSet = []
    for (el of allElements){
        if (!resultSet.includes(el)){
            resultSet.push(el)
        }
    }
    return resultSet
}

function crawlWeb(seed, maxDepth){
    let tocrawl = [seed]
    let crawled = []
    let next_depth = []
    let depth= 0
    while (tocrawl.length != 0 && depth <= maxDepth){
        let pageUrl = tocrawl.pop()
        if (!crawled.includes(pageUrl)){
            next_depth = union(next_depth, getAllLinks(getPage(pageUrl)))
            crawled.push(pageUrl)
        }
        if (tocrawl.length == 0){
            depth++
            tocrawl = next_depth
            next_depth = []
        }     
    }     
    return crawled
}

console.log(crawlWeb("http://www.udacity.com/cs101x/index.html", 1))




