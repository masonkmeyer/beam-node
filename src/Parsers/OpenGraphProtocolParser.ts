/// <reference path="../../typings/tsd.d.ts" />

'use strict';

// TODO: Something weird with typing.
var cheerio = require('cheerio');

import { Check } from '../Check';
import * as _ from 'underscore';

export class OpenGraphProtocolParser implements IParser {
    /**
     * Returns the open graph semantic data from the html string.
     */
    public parse(html: string): Beam.ISemanticData {
        if (!html || typeof html !== 'string' || !html.length) {
            // short cicuit if it isn't HTML.
            return <Beam.ISemanticData>{};
        }

        let $ = cheerio.load(html);

        let namespace = this.getNamespace($);
        let data = this.processTags($, $('meta'), namespace);

        return data;
    }

    /**
     * Extracts the key value combination from the tags
     */
    private processTags($: CheerioStatic, tags: Cheerio, namespace: string): any {
        let data = {};
        _.each(tags, (tag) => {
            let $tag = $(tag);
            let key: string = $tag.attr('property');
            let value: string = $tag.attr('content');

            if(key) {
              var objectData = this.objectify(key, value, namespace);
              _.extend(data, objectData);
            }
        });

        return data;
    }

    /**
     * The default namespace for opengraph is og but you can set it in the head tag.
     */
    private getNamespace($: CheerioStatic): string {
        let definedNamespace: string = $('head').first().attr('prefix');

        let namespace: string = 'og';

        if (definedNamespace && /:/.test(definedNamespace)) {
            let probableNamespace = _.first(definedNamespace.split(':'));
            if (probableNamespace.trim().length > 0) {
                namespace = probableNamespace;
            }
        }

        return namespace;
    }

    /**
     * Gets the key value pair from the namespace, key, value combination.
     * Typically, the key looks like this og:name or og:name:locale
     * This function turns it into name, name_locale.
     *
     * TODO: Types can be more complex than this. Handle it appropriately.
     */
    private objectify(key: string, value: string, namespace: string): any {
        Check.isNotNull(key, 'Key cannot be null');
        let paths = key.split(':');
        let objectPaths = _.without(paths, namespace);
        let property = objectPaths.join('_');

        let data:any = {};
        data[property] = value;

        return data;
    }
}
