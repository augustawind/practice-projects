function elt(type) {
    const node = document.createElement(type);
    Array.prototype.slice.call(arguments, 1).forEach(
        child => {
            if (typeof child === 'string')
                child = document.createTextNode(child);
            node.appendChild(child);
        }
    );
    return node;
}

document.getElementById('quote').appendChild(
    elt('footer', '-',
        elt('string', 'Karl Pepper'),
        ', preface to the second edition of ',
        elt('em', 'The Open Society and Its Enemies'),
        ', 1950'));
