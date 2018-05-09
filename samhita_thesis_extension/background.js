// when the extension is first installed
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.set({clean_news_feed: true});
    console.log('installed');
});

var userName = "";
var dataObjs = [];
var someArticleClicked = false;
var checkUrlVar = "";

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource" && checkUrlVar == "https://www.facebook.com/") {
        html = request.source;

        var currUserName = html.substring(html.search('class="homeSideNav"'));
        currUserName = currUserName.substring(currUserName.search('left_nav_item_'));
        var nameEnd = currUserName.search('"');
        currUserName = currUserName.substring(14,nameEnd);

        if (currUserName.indexOf("html lang=") == -1) {
            userName = currUserName;
        }

        userName = userName.hashCode().toString();
        
        newsFeedStartIndex = html.indexOf('aria-label="News Feed"');
        html = html.substring(newsFeedStartIndex);
        temp_html = html;
        temp_html_pos = 0;
        while (html.indexOf('href="') != -1) {
            var now = new Date();
            link_start = html.search('href="') + 6;
            link_html = html.substring(link_start);
            link_end = link_html.search('"');
            link = link_html.substring(0, link_end);

            currSharerHash = "NULL";
            currArticleSeenTime =  now.toUTCString();
            currArticleSharedTime =  "NULL";
            currComment = "NULL";
            currPopularity = "NULL";
            currTitle = "NULL";
            currArticleClicked =  false;
            currArticleClickedTime =  "NULL";
            currArticleHasImg = false;
            if (link.charAt(0) != '#' && link.charAt(0) != '/' && link.charAt(0) != '?' && link.indexOf('facebook.com') == -1 && link.indexOf('fbcdn.net') == -1 && link.indexOf('text/css') == -1 && !link.includes('fbcdn.net')) {
                console.log(link);
                //console.log(temp_html);
                // this is a legit link so parse out all the other important things
                temp_html_link = temp_html.indexOf(link);
                info = temp_html.substring(0, temp_html_link);
                //console.log(info);
                infoStartIndex = info.lastIndexOf('data-testid="fbfeed_story" data-');
                startInfo = info.substring(infoStartIndex-50);
                if (startInfo.includes('img class')) {currArticleHasImg = true;}
                //console.log(startInfo);

                descriptionEndIndex = startInfo.lastIndexOf('</p>');
                descriptionStartIndex = startInfo.lastIndexOf('<p>') + 3;
                description = startInfo.substring(descriptionStartIndex, descriptionEndIndex);
                if (description.charAt(0) == '<' || description.charAt(0) == '"' || description.charAt(0) == ' ' || description.length == 0) {
                    description = 'NULL';
                }
                currComment = description;
                //console.log(description);
                
                startInfo = startInfo.substring(0, descriptionStartIndex);
                shareTimeStartIndex = startInfo.lastIndexOf('abbr title="') + 12;
                shareTime = startInfo.substring(shareTimeStartIndex);
                shareTimeEndIndex = shareTime.indexOf('"');
                shareTime = shareTime.substring(0, shareTimeEndIndex);
                if (shareTime.length == 0) {
                    shareTime = 'NULL';
                }
                currArticleSharedTime = shareTime;
                //console.log(shareTime);

                roughSharerStartIndex = startInfo.lastIndexOf('data-hovercard-referer="');
                sharer = startInfo.substring(roughSharerStartIndex);
                sharerStartIndex = sharer.indexOf('>');
                sharerEndIndex = sharer.indexOf('</a>');
                sharer = sharer.substring(sharerStartIndex+1, sharerEndIndex);
                if (sharer.length == 0) {
                    sharer = 'NULL';
                }
                currSharerHash = sharer.hashCode().toString();
                //console.log(sharer);

                end_info = temp_html.substring(temp_html_link + link.length + 1)
                end_info_end = end_info.indexOf('Liking and commenting as');
                end_info = end_info.substring(0, end_info_end);
                
                firstnoopenerfollowIndex = end_info.indexOf('noopener nofollow') + 17;
                end_info = end_info.substring(firstnoopenerfollowIndex);
                noopenernofollowIndex = end_info.indexOf('noopener nofollow');
                end_info = end_info.substring(noopenernofollowIndex);
                titleStartIndex = end_info.indexOf('>') + 1;
                titleEndIndex = end_info.indexOf('</div>');
                title = end_info.substring(titleStartIndex, titleEndIndex-4);
                currTitle = title;
                //console.log(title);

                end_info = end_info.substring(titleEndIndex);
                reactionsStartIndex = end_info.indexOf('"See who reacted to this"');
                end_info = end_info.substring(reactionsStartIndex);
                reactionsStartIndex = end_info.indexOf('a aria-label') + 14;
                reactions = end_info.substring(reactionsStartIndex);
                reactionsEndIndex = reactions.indexOf('"');
                popularity = reactions.substring(0, reactionsEndIndex - 5);
                currPopularity = popularity;
                //console.log(popularity);

                var found = false;
                for(var i = 0; i < dataObjs.length; i++) {
                    var arrayUrl = dataObjs[i].articleURL;
                    var utmIndex = arrayUrl.search('utm_');
                    if (utmIndex != -1) {
                        arrayUrl = arrayUrl.substring(0, utmIndex);
                    }
                    currUrl = link;
                    utmIndex = currUrl.search('utm_');
                    if (utmIndex != -1) {
                        currUrl = currUrl.substring(0, utmIndex);
                    }
                    if (arrayUrl == currUrl) {
                        found = true;
                        if (dataObjs[i].articleClicked == true && dataObjs[i].sharerHash.length == 0) {
                            dataObjs[i].sharerHash = [{"S": currSharerHash}];
                            dataObjs[i].articleSharedTime = [{"S": currArticleSharedTime}];
                            dataObjs[i].articleTitle = currTitle;
                            dataObjs[i].articleComments = [{"S": currComment}];
                            dataObjs[i].articlePopularity = [{"S": currPopularity}];
                        } else if (dataObjs[i].articleClicked == false) {
                            sharerHashLength = dataObjs[i].sharerHash.length;
                            for (j = sharerHashLength-1; j >= 0; j--) {
                                if (currSharerHash == dataObjs[i].sharerHash[j]) {
                                    if (Math.abs(currArticleSeenTime - dataObjs[i].articleSeenTime[j].S) > 300000) {
                                        dataObjs[i].sharerHash.push({"S": currSharerHash});
                                        dataObjs[i].sharedTime.push({"S": currArticleSharedTime});
                                        dataObjs[i].articleSeenTime.push({"S": currArticleSeenTime});
                                        dataObjs[i].articleComments.push({"S": currComment});
                                        dataObjs[i].articlePopularity.push({"S": currPopularity});
                                    }
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
                if (found == false) {
                    var currObj = {articleURL: link, articleTitle: currTitle, sharerHash: [{"S": currSharerHash}], articleSeenTime: [{"S": currArticleSeenTime.toString()}], articleSharedTime: [{"S": currArticleSharedTime.toString()}], articleComments: [{"S": currComment}], articlePopularity: [{"S": currPopularity}], articleClicked: currArticleClicked, articleClickedTime: currArticleClickedTime};
                    dataObjs.push(currObj);
                    console.log(dataObjs);
                }
                html_end = html.substring('Liking and commenting as');
                html = link_html.substring(html_end);
                temp_html = html;
                temp_html_pos = 0;
            } else {
                // update current spot in temp_html by adding link_end to temp_html length
                temp_html_pos = temp_html_pos + link_start + link_end + 1;
                html = link_html.substring(link_end+link_start+1);
            }
        }
        if (someArticleClicked == true) {
            flushToDB(dataObjs);
            someArticleClicked = false;
        }
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        currUrl = tab.url;
        checkUrlVar = tab.url;
        if (currUrl == "https://www.facebook.com/" && currUrl.length == 25) {
            chrome.tabs.executeScript({
                file: 'getPagesSource.js'
            });
        } else {
            notFacebook(tab);
        }
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        currUrl = tab.url;
        checkUrlVar = tab.url;
        if (currUrl == "https://www.facebook.com/") {
            chrome.tabs.executeScript({
                file: 'getPagesSource.js'
            });
        } else {
            notFacebook(tab)
        }
    });
});

function notFacebook(tab) {
    if (tab.openerTabId) {
        chrome.tabs.get(tab.openerTabId, function(parent_tab){
            if (parent_tab.url == "https://www.facebook.com/" && tab.url != "chrome://newtab/" && tab.url.indexOf("facebook.com") == -1) {
                someArticleClicked = true;
                var now = new Date();
                var found = false;
                for(var i = 0; i < dataObjs.length; i++) {
                    var arrayUrl = dataObjs[i].articleURL;
                    var utmIndex = arrayUrl.search('utm');
                    if (utmIndex != -1) {
                        arrayUrl = arrayUrl.substring(0, utmIndex);
                    }
                    currUrl = tab.url;
                    utmIndex = tab.url.search('utm');
                    if (utmIndex != -1) {
                        currUrl = tab.url.substring(0, utmIndex);
                    }
                    if (arrayUrl == currUrl) {
                        found = true;
                        // article has been clicked on and already exists in the dataObjs array so simply update clicked to true and the clicked time
                        dataObjs[i].articleClicked = true;
                        dataObjs[i].articleClickedTime = now.toUTCString();
                        break;
                    } 
                }
                if (found == false) {
                    // article had not been previously parsed from html so add url, clicked = true, and clicked time and when you go back to facebook it will be taken care of
                    currObj = {articleURL: tab.url, sharerHash: [], articleTitle: "NULL", articleSeenTime: [{"S": now.toUTCString()}], articleSharedTime: [], articleComments: [], articlePopularity: [], articleClicked: true, articleClickedTime: now.toUTCString()};
                    dataObjs.push(currObj);
                }
            }     
        });
    }
}

function doGetCheck(getData) {
    return new Promise(function (resolve, reject) {
        const getXhr = new XMLHttpRequest();
        getXhr.onreadystatechange = function() {
            if (getXhr.readyState === 4) {
                if (getXhr.status === 200) {
                    resolve(getXhr.response);
                } else {
                    reject(getXhr.status);
                }
            }
        }
        getXhr.open('POST', 'https://42n13klu0d.execute-api.us-east-2.amazonaws.com/test/getarticleres', true);
        getXhr.send(JSON.stringify(getData));
    });
}

function flushToDB(dataObjs) {
    var obj = dataObjs.shift();
    var newDataObjs = dataObjs;
    if (obj) {
        console.log(obj.articleURL);
        // if an article has been clicked on and is in the DB, we don't care about any future engagements
        var getData = {
            userHash: userName,
            articleURL: obj.articleURL
        }
        const getPromise = doGetCheck(getData);
        getPromise
            .then(function useGetInfo(response) { 
                res = JSON.parse(response);
                if (res["body"].hasOwnProperty("Item")) {
                    // item exists
                    // if it is NOT clicked on, check that time is > 5 minutes or that it is now clicked on
                    dbItem = res["body"]["Item"];
                    if (dbItem["articleClicked"].BOOL == false) {
                        objArticleSeenTimesLength = obj.articleSeenTime.length
                        dbArticleSeenTimesLength = dbItem["articleSeenTime"].L.length
                        if ((Math.abs(Date.parse(obj.articleSeenTime[objArticleSeenTimesLength-1].S) - Date.parse(dbItem["articleSeenTime"].L[dbArticleSeenTimesLength-1].S) > 300000)) || (obj.articleClicked == true)) {
                            var data = {
                                userHash: userName,
                                articleURL: obj.articleURL,
                                articleTitle: obj.articleTitle,
                                sharerHash: dbItem["sharerHash"].L.concat(obj.sharerHash),
                                articleSeenTime: dbItem["articleSeenTime"].L.concat(obj.articleSeenTime),
                                articleSharedTime: dbItem["articleSharedTime"].L.concat(obj.articleSharedTime),
                                articleComments: dbItem["articleComments"].L.concat(obj.articleComments),
                                articlePopularity: dbItem["articlePopularity"].L.concat(obj.articlePopularity),
                                articleClicked: obj.articleClicked,
                                articleClickedTime: obj.articleClickedTime.toString()
                            }
                        
                            var xhr = new XMLHttpRequest();
                            xhr.open('POST', 'https://42n13klu0d.execute-api.us-east-2.amazonaws.com/test/testres', true);
                            xhr.setRequestHeader("Content-type", "application/json");
                            xhr.send(JSON.stringify(data));
                        }
                    }
                } else {
                    // item does not exist so add it to the db
                    var data = {
                        userHash: userName,
                        articleURL: obj.articleURL,
                        articleTitle: obj.articleTitle,
                        sharerHash: obj.sharerHash,
                        articleSeenTime: obj.articleSeenTime,
                        articleSharedTime: obj.articleSharedTime,
                        articleComments: obj.articleComments,
                        articlePopularity: obj.articlePopularity,
                        articleClicked: obj.articleClicked,
                        articleClickedTime: obj.articleClickedTime.toString()
                    }
                    console.log(JSON.stringify(data));
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', 'https://42n13klu0d.execute-api.us-east-2.amazonaws.com/test/testres', true);
                    xhr.setRequestHeader("Content-type", "application/json");
                    xhr.send(JSON.stringify(data));
                }
                flushToDB(newDataObjs);
            })
            .catch(function handleErrors(error) {
                console.log('when a reject is executed it will come here ignoring the then statement ', error);
            })
    }
    
    
    dataObjs = [];
    someArticleClicked = false;
}

// from: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}