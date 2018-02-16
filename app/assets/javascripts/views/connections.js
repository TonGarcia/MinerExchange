// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// Shared Variables
var connections = { root:{}, friends:[] };

function graphSetup() {
    // Facebook SDK

    // Initialize the Facebook SDK
    window.fbAsyncInit = function () {
        FB.init({
            appId: '235111140235293', // App ID
            // channelUrl: 'connections/channel', // Path to your Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true  // parse XFBML
        });

        // Listen for and handle auth.statusChange events
        FB.Event.subscribe('auth.statusChange', function (response) {
            if (response.authResponse) {
                // On login...
                FB.api('/me?fields=id,name,picture', function (me) {
                    if (me.name) {
                        // Display user name
                        connections.root = me;
                        document.getElementById('auth-displayname').innerHTML = me.name;
                        // Retrieve friends API object
                        FB.api('/me/taggable_friends', getFriends);
                    }
                });
                document.getElementById('auth-loggedout').style.display = 'none';
                document.getElementById('auth-loggedin').style.display = 'block';
            } else {
                // User has not authorized your app or isn't logged in
                document.getElementById('auth-loggedout').style.display = 'block';
                document.getElementById('auth-loggedin').style.display = 'none';
            }
        });

        // Respond to clicks on login and logout links
        document.getElementById('auth-loginlink').addEventListener('click', function () {
            FB.login(function(resp) {
                // TODO LogIn success
            }, {scope: 'public_profile,user_friends,email'});
        });
        document.getElementById('auth-logoutlink').addEventListener('click', function () {
            FB.logout();
        });
    };

    function getFriends(response) {
        console.log('getFriends STARTED', response);

        // Loads friend nodes as an array. Creates array to hold links between mutual friends.
        connections.friends = response['data'];
        var friends = connections.friends;
        var friendLinks = [];

        for (i = 0; i < friends.length; i++) {
            var id = friends[i]['id'];
            getLinks(response, id, friends, friendLinks);
            // getMutualFriends(id, friends, friendLinks);
            // getAllMutualFriends(id, friends, friendLinks);
        }

        console.log('getFriends DONE');
    }

    function getAllMutualFriends(id, friends, friendLinks) {
        console.log('get ALL MutualFriends STARTED');

        FB.api(
            "/" + id,
            {
                "fields": "context.fields(all_mutual_friends.limit(100))"
            },
            function (response) {
                if (response && !response.error) {
                    console.log('ALL MutualFriends resp: ', response);
                    getLinks(response, id, friends, friendLinks);
                } else {
                    console.log('ALL MutualFriends ERROR: ', response.error);
                }
            }
        );

        console.log('get ALL MutualFriends DONE');
    }

    function getMutualFriends(id, friends, friendLinks) {
        console.log('getMutualFriends STARTED', id);

        // Retrieves a Facebook API object containing mutual friends
        // for a given user ID. Passes it to the getLinks() function.
        FB.api('/', + id +'/all_mutual_friends', function (response) {
                getLinks(response, id, friends, friendLinks);
            }
        );

        console.log('getMutualFriends DONE');
    }

    function getLinks(response, id, friends, friendLinks) {
        console.log('getLinks STARTED', response);

        // Calculates links between mutual friends and pushes them to an array.
        // Displays percent of friend links completed in 'load-status' div.
        var mutualFriends = response['data'];
        var sourceIndex = indexWithAttribute(friends, 'id', id);

        var completed = Math.round(100 * (sourceIndex / friends.length));
        document.getElementById('load-status').innerHTML = 'Calculating mutual friend links: ' + completed + '%';

        for (var i = 0; i < mutualFriends.length; i++) {
            friends[sourceIndex]['value'] = mutualFriends.length;
            targetIndex = indexWithAttribute(friends, 'id', mutualFriends[i]['id']);
            friendLinks.push({
                'source': sourceIndex,
                'target': targetIndex,
                'value': mutualFriends.length
            });
        }

        sourceIndex = parseInt(sourceIndex);
        if (sourceIndex === friends.length - 1) graphFriends(friends, friendLinks);
        console.log('getLinks DONE');
    }

    function graphFriends(friends, friendLinks) {
        console.log('graphFriends STARTED', friends, friendLinks);

        treeGraph(friends, friendLinks);
        // socialGraph(friends, friendLinks);

        console.log('graphFriends END', friends, friendLinks);
    }

    function indexWithAttribute(array, attr, value) {
        // Iterates over an array and returns the index of the element
        // whose attribute matches the given value, or -1 if not found.
        var i = 0;
        for (i in array) if (array[i][attr] === value) return i;
        return -1;
    }

    function formattedConnections() {
        var f = 0;
        var children = [];

        for(f in connections.friends) {
            const friend = connections.friends[f];
            children.push({
                name: friend.name,
                img: friend.picture.data.url
            });
        }

        return {
            name: connections.root.name,
            img: connections.root.picture.data.url,
            children: children
        };
    }

    function treeGraph(friends, friendLinks) {
        // some colour variables
        var tcBlack = "#130C0E";

        // rest of vars
        var w = 960,
            h = 800,
            maxNodeSize = 50,
            x_browser = 20,
            y_browser = 25,
            root;

        var vis;
        var force = d3.layout.force();

        vis = d3.select("#viz").append("svg").attr("width", w).attr("height", h);

        d3.json("marvel.json", function (json) {

            json = formattedConnections();
            root = json;
            root.fixed = true;
            root.x = w / 2;
            root.y = h / 4;


            // Build the path
            var defs = vis.insert("svg:defs")
                          .data(["end"]);

            // vis.selectAll("svg:defs")
            //     .data(links, function (d) {
            //         return d.target.id;
            //     });

            defs.enter().append("svg:path")
                .attr("d", "M0,-5L10,0L0,5");

            update();
        });


        /**
         *
         */
        function update() {
            var nodes = flatten(root),
                links = d3.layout.tree().links(nodes);

            // Restart the force layout.
            force.nodes(nodes)
                .links(links)
                .gravity(0.05)
                .charge(-1500)
                .linkDistance(100)
                .friction(0.5)
                .linkStrength(function (l, i) {
                    return 1;
                })
                .size([w, h])
                .on("tick", tick)
                .start();

            var path = vis.selectAll("path.link")
                .data(links, function (d) {
                    return d.target.id;
                });

            path.enter().insert("svg:path")
                .attr("class", "link")
                // .attr("marker-end", "url(#end)")
                .style("stroke", "#eee");


            // Exit any old paths.
            path.exit().remove();


            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function (d) {
                    return d.id;
                });


            // Enter any new nodes.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
                .on("click", click)
                .call(force.drag);

            // Append a circle
            nodeEnter.append("svg:circle")
                .attr("r", function (d) {
                    return Math.sqrt(d.size) / 10 || 4.5;
                })
                .style("fill", "#eee");


            // Append images
            var images = nodeEnter.append("svg:image")
                .attr("xlink:href", function (d) {
                    return d.img;
                })
                .attr("x", function (d) {
                    return -25;
                })
                .attr("y", function (d) {
                    return -25;
                })
                .attr("radius", '50%')
                .attr("height", 50)
                .attr("width", 50);

            // make the image grow a little on mouse over and add the text details on click
            var setEvents = images
            // Append hero text
                .on('click', function (d) {
                    d3.select("h1").html(d.hero);
                    d3.select("h2").html(d.name);
                    d3.select("h3").html("Take me to " + "<a href='" + d.link + "' >" + d.hero + " web page ⇢" + "</a>");
                })

                .on('mouseenter', function () {
                    // select element in current context
                    d3.select(this)
                        .transition()
                        .attr("x", function (d) {
                            return -60;
                        })
                        .attr("y", function (d) {
                            return -60;
                        })
                        .attr("height", 100)
                        .attr("width", 100);
                })
                // set back
                .on('mouseleave', function () {
                    d3.select(this)
                        .transition()
                        .attr("x", function (d) {
                            return -25;
                        })
                        .attr("y", function (d) {
                            return -25;
                        })
                        .attr("height", 50)
                        .attr("width", 50);
                });

            // Append hero name on roll over next to the node as well
            nodeEnter.append("text")
                .attr("class", "nodetext")
                .attr("x", x_browser)
                .attr("y", y_browser + 15)
                .attr("fill", tcBlack)
                .text(function (d) {
                    return d.hero;
                });


            // Exit any old nodes.
            node.exit().remove();


            // Re-select for update.
            path = vis.selectAll("path.link");
            node = vis.selectAll("g.node");

            function tick() {


                path.attr("d", function (d) {

                    var dx = d.target.x - d.source.x,
                        dy = d.target.y - d.source.y,
                        dr = Math.sqrt(dx * dx + dy * dy);
                    return "M" + d.source.x + ","
                        + d.source.y
                        + "A" + dr + ","
                        + dr + " 0 0,1 "
                        + d.target.x + ","
                        + d.target.y;
                });
                node.attr("transform", nodeTransform);
            }
        }


        /**
         * Gives the coordinates of the border for keeping the nodes inside a frame
         * http://bl.ocks.org/mbostock/1129492
         */
        function nodeTransform(d) {
            d.x = Math.max(maxNodeSize, Math.min(w - (d.imgwidth / 2 || 16), d.x));
            d.y = Math.max(maxNodeSize, Math.min(h - (d.imgheight / 2 || 16), d.y));
            return "translate(" + d.x + "," + d.y + ")";
        }

        /**
         * Toggle children on click.
         */
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }

            update();
        }


        /**
         * Returns a list of all nodes under the root.
         */
        function flatten(root) {
            var nodes = [];
            var i = 0;

            function recurse(node) {
                if (node.children)
                    node.children.forEach(recurse);
                if (!node.id)
                    node.id = ++i;
                nodes.push(node);
            }

            recurse(root);
            return nodes;
        }
    }
}