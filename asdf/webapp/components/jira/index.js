import React from 'react';
import PropTypes from 'prop-types';

export default class Jira extends React.PureComponent {
    static propTypes = {
        post: PropTypes.object.isRequired
    }

    parseInline = (string) => {
        string = string.replace(/\*(.*)\*/, (match, content) => '<strong>' + content + '</strong>');
        string = string.replace(/_(.*)_/, (match, content) => '<em>' + content + '</em>');
        string = string.replace(/\?\?(.*)\?\?/, (match, content) => '<cite>' + content + '</cite>');
        string = string.replace(/-(.*)-/, (match, content) => '<del>' + content + '</del>');
        string = string.replace(/\+(.*)\+/, (match, content) => '<ins>' + content + '</ins>');
        string = string.replace(/\^(.*)\^/, (match, content) => '<sup>' + content + '</sup>');
        string = string.replace(/~(.*)~/, (match, content) => '<sub>' + content + '</sub>');
        string = string.replace(/{{(.*)}}/, (match, content) => '<code>' + content + '</code>');

        string = string.replace(/\[~([a-z0-9.\-_]*)\]/i, (match, username) => `<a href="#">${username}</a>`);
        string = string.replace(/\[([^|\]]*)\|?([^|\]]*)\]/, (match, linkOrTitle, link) => `<a href="${link || linkOrTitle}">${linkOrTitle}</a>`);
        string = string.replace(/!([^!]*)!/i, (match, src) => `<img src="${src}">Image</img>`);

        return string;
    }

    render() {
        let output = '';

        const lines = this.props.post.message.split('\n')
        let i = 0;
        while (i < lines.length) {
            const line = lines[i];
            let cap;
            let skip = false;

            if (cap = (/^h([1-6])\. (.*)$/).exec(line)) {
                output += `<h${cap[1]}>${this.parseInline(cap[2])}</h1>`;
            } else if (cap = (/^bq\. (.*)$/).exec(line)) {
                output += `<blockquote>${this.parseInline(cap[1])}</blockquote>`;
            } else if (cap = (/^{noformat}$/).exec(line)) {
                let end = -1;
                for (let j = i + 1; j < lines.length; j++) {
                    if ((/^{noformat}$/).test(lines[j])) {
                        end = j;
                        break;
                    }
                }

                if (end !== -1) {
                    output += '<div class="post-code"><code class="hljs">';
                    for (let j = i + 1; j < end; j++) {
                        output += lines[j] + '\n';
                    }
                    output += '</code></div>';

                    i = end + 1; // code blocks capture end
                    skip = true;
                }
            } else if (cap = (/^# (.*)$/).exec(line)) {
                let end = lines.length;
                for (let j = i + 1; j < lines.length; j++) {
                    if (!(/^# (.*)/).test(lines[j])) {
                        end = j;
                        break;
                    }
                }

                output += '<ol>';
                for (let j = i; j < end; j++) {
                    let itemCap = (/^# (.*)$/).exec(lines[j]);
                    output += `<li>${this.parseInline(itemCap[1])}</li>`
                }
                output += '</ol>';

                i = end; // lists don't capture end
                skip = true;
            } else {
                output += `<p>${this.parseInline(lines[i])}</p>`;
            }

            if (!skip) {
                i += 1;
            }
        }

        return <div dangerouslySetInnerHTML={{__html: output}}/>
    }
}
