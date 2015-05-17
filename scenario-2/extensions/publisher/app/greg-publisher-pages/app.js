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
app.server = function() {
    return {
        endpoints: {
            pages: [{
                url: 'associations',
                title: 'Associations',
                path: 'associations.jag'
            }, {
                url: 'intro',
                title: 'Intro to GC',
                path: 'intro.jag'
            }]
        }
    };
};
app.renderer = function(ctx) {
    var type = ctx.assetType;
    var isActivatedAsset = function(assetType) {
        var app = require('rxt').app;
        var activatedAssets = app.getActivatedAssets(ctx.tenantId); //ctx.tenantConfigs.assets;
        //return true;
        if (!activatedAssets) {
            throw 'Unable to load all activated assets for current tenant: ' + ctx.tenatId + '.Make sure that the assets property is present in the tenant config';
        }
        for (var index in activatedAssets) {
            if (activatedAssets[index] == assetType) {
                return true;
            }
        }
        return false;
    };
    return {
        pageDecorators: {
            ribbon: function(page) {
                var ribbon = page.ribbon = {};
                var DEFAULT_ICON = 'icon-cog';
                var assetTypes = [];
                var assetType;
                var assetList = ctx.rxtManager.listRxtTypeDetails();
                for (var index in assetList) {
                    assetType = assetList[index];
                    if (isActivatedAsset(assetType.shortName)) {
                        assetTypes.push({
                            url: '/asts/' + assetType.shortName + '/list',
                            assetIcon: assetType.ui.icon || DEFAULT_ICON,
                            assetTitle: assetType.singularLabel
                        });
                    }
                }
                ribbon.currentType = page.rxt.singularLabel;
                ribbon.currentTitle = page.rxt.singularLabel;
                ribbon.currentUrl = '/asts/' + assetType.shortName + '/list';
                ribbon.shortName = page.rxt.singularLabel;
                ribbon.query = 'Query';
                ribbon.breadcrumb = assetTypes;
                return page;
            },
            leftNav: function(page) {
                var buttons = [];
                buttons.push({
                    name: 'button1',
                    iconClassOut: 'btn-stats',
                    iconClassIn: 'btn-stats',
                    url: '#'
                });
                page.leftNav = buttons;
                return page;
            },
            introDecorator: function(page) {
                var assetList = ctx.rxtManager.listRxtTypeDetails();
                var assetInfo;
                page.intro = {};
                page.intro.availableAssets = [];
                for (var index in assetList) {
                    assetInfo = assetList[index];
                    page.intro.availableAssets.push(assetInfo);
                }
                return page;
            }
        }
    };
};