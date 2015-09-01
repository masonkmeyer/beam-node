/// <reference path="IParser.ts"/>
/// <reference path="../typings/tsd.d.ts" />
'use strict';

var cheerio: CheerioAPI = require('cheerio');

export class OpenGraphProtocolParser implements IParser {
    public parse(html: string): any {
        if (!html || typeof html !== 'string' || !html.length) {
            // short cicuit if it isn't HTML.
            return {};
        }

        let $ = cheerio.load(html);

        let data: any = {};
        let htmlNamespace: string = $('html').first().attr('prefix');
        if (htmlNamespace) {
            htmlNamespace.split(':').slice(0);
        }

        let namespace: string = 'og:';
        let metaTags: Cheerio = $('meta');

        for (let i: number = 0; i < metaTags.length; i++) {
            let metaTag = metaTags[i];
            let tag: Cheerio = $(metaTag);
            let key: string = tag.attr('property');
            let value: string = tag.attr('content');

            if (key) {
                let indexOfNamespace: number = key.indexOf(namespace);

                if (indexOfNamespace >= 0) {
                    let name: string = key.replace(namespace, '');
                    data[name] = value;
                }
            }
        }

        return data;
    }
}
