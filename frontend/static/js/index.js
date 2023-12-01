// Import various views used in the application.
import Home from "./views/Home.js";
import Contact from "./views/Contact.js";
import AboutMe from "./views/AboutMe.js";

import { set_active_nav_link } from "./nav.js";

// Define routes for the application, mapping paths to their associated views.
const routes = [
    { path: "/", view: Home },
    { path: "/contact", view: Contact },
    { path: "/about", view: AboutMe }
];

// Helper function to convert a path into a regular expression for route matching.
const path_to_regex = path => new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`);

// Function to navigate to a different URL and update the view.
const navigate_to = url => {
    history.pushState(null, null, url);
    router();
};

// Function to extract parameters from a match.
const get_params = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return keys.reduce((params, key, i) => {
        params[key] = values[i];
        return params;
    }, {});
};

// Main routing function that monitors the current URL and displays the corresponding view.
const router = async () => {
    // Generate a list of potential matches for the current routes.
    const potential_matches = routes.map(route => ({
        route,
        result: location.pathname.match(path_to_regex(route.path))
    }));

    const matchIndex = potential_matches.findIndex(potential_match => potential_match.result !== null);
    const match = matchIndex !== -1 ? potential_matches[matchIndex] : { route: routes[0], result: [location.pathname] };

    const view = new match.route.view(get_params(match));
    document.querySelector("#app").innerHTML = await view.get_html();
    window.scrollTo(0, 0);
    set_active_nav_link();

    // VanillaTilt.init(document.querySelector(".border_circle"), {
    //     max: 25,
    //     speed: 600
    // });
};

// Add an event listener to handle changes in the browser's history (e.g., back/forward buttons).
window.addEventListener("popstate", router);

// Add an event listener to execute the routing function when the DOM content is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
    // Add a click event listener to handle links with the "data-link" attribute.
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) 
        {
            e.preventDefault();
            navigate_to(e.target.href);
        }
    });

    // Initialize the routing function when the DOM is ready.
    router();
});

