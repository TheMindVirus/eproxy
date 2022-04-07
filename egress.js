var case_correct = function(data)
{
    for (var oldkey in data)
    {
        var newkey = "";
        var flag = 1;
        for (var i = 0; i < oldkey.length; ++i)
        {
            if (oldkey[i] != "-")
            {
                if (flag == 1) { newkey += oldkey[i].toUpperCase(); flag = 0; }
                else { newkey += oldkey[i].toLowerCase(); }
            }
            else { newkey += "-"; flag = 1; }
        }
        tmp = data[oldkey];
        delete data[oldkey];
        data[newkey] = tmp;
    }
    return data;
}
msg.headers = case_correct(msg.headers);

//!!!BUG: Lack of Trailing Slash for Directories,
//        Extraneous Trailing Slash for Files
if ((msg.headers["Content-Type"] == "text/html")
&& (!msg.req.url.endsWith("/")))
{
    msg.statusCode = 301;
    msg.headers["Location"] = msg.req.url + "/";
    msg.payload = "REDIRECT";
}

msg.debug = msg.headers;
return msg;