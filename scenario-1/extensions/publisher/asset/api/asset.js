/*
 *  Copyright (c) 2005-2014, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */
asset.manager = function(ctx) {
    return {
        get: function(id) {
            log.info('### get method overridden by api asset extension ###');
            return this._super.get.call(this, id);
        }
    }
};
asset.server = function(ctx) {
    return {
        endpoints: {
            apis: [{
                url: 'documents',
                path: 'documents.jag'
            }],
            pages: [{
                url: 'tiers',
                path: 'tiers.jag'
            }, {
                url: 'documents',
                path: 'documents.jag',
                title:'Documents'
            }]
        }
    };
};
asset.renderer = function(ctx) {
    return {
        pageDecorators: {
            documents: function(page) {
                if (page.assets.id) {
                    page.leftNav.push({
                        name: 'Documents',
                        iconClassOut: 'btn-overview',
                        iconClassIn: 'btn-overview',
                        url: '/asts/api/documents/' + page.assets.id
                    });
                }
            }
        }
    }
}