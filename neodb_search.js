// ==UserScript==
// @name         NeoDB 安娜档案搜索
// @name:en      annas archive for NeoDB
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  在 NeoDB 书籍页面添加安娜档案搜索结果
// @description:en  dispaly annas archive search result on NeoDB
// @author       lozhang
// @match        https://neodb.social/book/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @connect      *
// @license MIT
// ==/UserScript==


(function() {
    'use strict';

    // 默认域名配置
    const DEFAULT_DOMAIN = 'annas-archive.li';

    // 获取当前配置的域名
    function getDomain() {
        return GM_getValue('annas_archive_domain', DEFAULT_DOMAIN);
    }

    // 注册菜单命令
    GM_registerMenuCommand('⚙️ 设置 Anna\'s Archive 域名', () => {
        const currentDomain = getDomain();
        const newDomain = prompt('请输入 Anna\'s Archive 域名（如 annas-archive.li）：', currentDomain);
        if (newDomain && newDomain.trim()) {
            GM_setValue('annas_archive_domain', newDomain.trim());
            alert('域名已更新为: ' + newDomain.trim() + '\n刷新页面生效');
        }
    });

    GM_registerMenuCommand('🔄 重置域名为默认值', () => {
        GM_setValue('annas_archive_domain', DEFAULT_DOMAIN);
        alert('域名已重置为: ' + DEFAULT_DOMAIN + '\n刷新页面生效');
    });

    // 主函数
    function main() {

        // 检查是否在书籍页面
        if (!window.location.href.match(/https:\/\/neodb\.social\/book\/[a-zA-Z0-9]+/)) {
            console.log('检查是否在书籍页面');
            return;
        }

        // 获取书籍标题
        const bookTitle = getBookTitle();
        if (!bookTitle) {
            console.error('无法获取书籍标题');
            return;
        }

        //console.log('title', bookTitle);

        // 搜索安娜档案
        searchAnnasArchive(bookTitle);
    }

    // 获取书籍标题
    function getBookTitle() {
        // 尝试从页面标题中获取
        const titleElement = document.querySelector('h1.item-title');
        if (titleElement) {
            return titleElement.textContent.trim();
        }

        // 备选方案：从 meta 标签获取
        const metaTitle = document.querySelector('meta[property="og:title"]');
        if (metaTitle) {
            let title = metaTitle.getAttribute('content');
            // 移除可能的前缀，如 "图书 - "
            title = title.replace(/^图书\s*-\s*/, '');
            return title.trim();
        }

        return null;
    }

    // 在安娜档案搜索
    function searchAnnasArchive(bookTitle) {
        const domain = getDomain();
        const searchUrl = `https://${domain}/search?q=${encodeURIComponent(bookTitle)}`;

        GM_xmlhttpRequest({
            method: 'GET',
            url: searchUrl,
            onload: function(response) {
                if (response.status === 200) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, 'text/html');

                    // 提取搜索结果
                    const results = extractSearchResults(doc);
                    console.log("results", results, doc);

                    // 在页面上显示结果
                    displayResults(results, searchUrl);
                } else {
                    console.error('安娜档案搜索失败:', response.statusText);
                }
            },
            onerror: function(error) {
                console.error('请求安娜档案时出错:', error);
            }
        });
    }

    // 从安娜档案页面提取搜索结果
    function extractSearchResults(doc) {
        const results = [];
        const resultElements = doc.querySelectorAll('.js-aarecord-list-outer > div.flex.border-b');

        resultElements.forEach(element => {
            // 标题 - 带有 js-vim-focus 类的 a 标签
            const titleElement = element.querySelector('a.js-vim-focus');
            if (!titleElement) return;

            // 链接
            const linkElement = element.querySelector('a[href^="/md5/"]');
            if (!linkElement) return;

            // 格式 - 包含语言、格式、大小的 div
            const formatDiv = element.querySelector('.text-gray-800.font-semibold.text-sm');

            // 作者 - 带有 user-edit 图标的链接
            const authorLink = element.querySelector('a[href^="/search?q="] span[class*="user-edit"]');

            const result = {
                title: titleElement.textContent.trim(),
                link: `https://${getDomain()}${linkElement.getAttribute('href')}`,
                format: formatDiv ? formatDiv.textContent.split('·').slice(0, 3).join('·').trim() : '未知格式',
                author: authorLink ? authorLink.parentElement.textContent.trim() : '未知作者'
            };

            results.push(result);
        });

        return results;
    }

    // 在页面上显示结果
    function displayResults(results, searchUrl) {
        // 创建结果容器
        const container = document.createElement('div');
        container.className = 'annas-archive-results';
        container.style.cssText = 'margin-top: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; font-size: 14px;';

        // 添加标题
        const title = document.createElement('h3');
        title.textContent = '安娜档案搜索结果';
        title.style.cssText = 'margin: 0 0 10px 0; font-size: 16px;';
        container.appendChild(title);

        // 添加搜索链接
        const searchLink = document.createElement('a');
        searchLink.href = searchUrl;
        searchLink.textContent = '查看完整结果 →';
        searchLink.target = '_blank';
        searchLink.style.cssText = 'display: block; margin-bottom: 10px; color: #0066cc; font-size: 13px;';
        container.appendChild(searchLink);

        // 如果没有结果
        if (results.length === 0) {
            const noResults = document.createElement('p');
            noResults.textContent = '未找到相关结果';
            noResults.style.color = '#666';
            container.appendChild(noResults);
        } else {
            // 创建结果列表
            const resultsList = document.createElement('ul');
            resultsList.style.cssText = 'list-style-type: none; padding: 0; margin: 0;';

            results.forEach(result => {
                const listItem = document.createElement('li');
                listItem.style.cssText = 'margin-bottom: 8px; padding: 8px; border: 1px solid #eee; border-radius: 4px; background: #fff;';

                const resultTitle = document.createElement('a');
                resultTitle.href = result.link;
                resultTitle.textContent = result.title;
                resultTitle.target = '_blank';
                resultTitle.style.cssText = 'font-weight: bold; display: block; color: #333; text-decoration: none; margin-bottom: 4px; line-height: 1.3;';
                listItem.appendChild(resultTitle);

                const resultDetails = document.createElement('div');
                resultDetails.style.cssText = 'font-size: 12px; color: #666; line-height: 1.4;';
                resultDetails.textContent = `${result.author} | ${result.format}`;
                listItem.appendChild(resultDetails);

                resultsList.appendChild(listItem);
            });

            container.appendChild(resultsList);
        }

        // 插入到页面右侧边栏
        const sidebar = document.querySelector('#item-sidebar');
        if (sidebar) {
            sidebar.appendChild(container);
        } else {
            // 备选：添加到 body
            document.body.appendChild(container);
        }
    }

    // 页面加载完成后执行
    window.addEventListener('load', main);
})();