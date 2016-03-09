'use strict';

function byTagName(node, tagName) {
    function tagNames (nodes, node, tagName) {
        if (node.nodeType !== document.ELEMENT_NODE)
            return [];
        if (node.tagName.toLowerCase() === tagName.toLowerCase())
            nodes.push(node);
        for (let i = 0; i < node.children.length; i++)
            nodes.concat(tagNames(node.children[i], tagName));
        return nodes;
    }

    return tagNames([], node, tagName);
}
