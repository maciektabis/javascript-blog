'use strict';

const templates = {
	articleLink: Handlebars.compile(
		document.querySelector('#template-article-link').innerHTML
	),
	articleTagLink: Handlebars.compile(
		document.querySelector('#template-article-tag-link').innerHTML
	),
	articleAuthorLink: Handlebars.compile(
		document.querySelector('#template-article-author-link').innerHTML
	),
	tagCloudLink: Handlebars.compile(
		document.querySelector('#template-tag-cloud-link').innerHTML
	),
	authorColumnLink: Handlebars.compile(
		document.querySelector('#template-author-column-link').innerHTML
	),
};

const titleClickHandler = function (event) {
	event.preventDefault();
	const clickedElement = this;
	console.log('Link was clicked!');
	console.log(event);
	/* [DONE] remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll('.titles a.active');

	for (let activeLink of activeLinks) {
		activeLink.classList.remove('active');
	}
	/* [DONE] add class 'active' to the clicked link */
	clickedElement.classList.add('active');
	console.log('clickedElement:', clickedElement);
	/* [DONE] remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll('.post');

	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove('active');
	}
	/* [DONE] get 'href' attribute from the clicked link */
	const articleSelector = clickedElement.getAttribute('href');
	console.log(articleSelector);
	/* [DONE] find the correct article using the selector (value of 'href' attribute) */
	const targetArticle = document.querySelector(articleSelector);
	console.log(targetArticle);
	/* [DONE] add class 'active' to the correct article */
	targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
	optTitleSelector = '.post-title',
	optTitleListSelector = '.titles',
	optArticleTagsSelector = '.post-tags .list',
	optArticleAuthorSelector = '.post-author',
	optTagsListSelector = '.tags.list',
	optAuthorsListSelector = '.list.authors',
	optCloudClassPrefix = 'tag-size-',
	optCloudClassCount = 5;
function generateTitleLinks(customSelector = '') {
	/* [DONE] remove contents of titleList */
	const titleList = document.querySelector(optTitleListSelector);
	function clearTitleList() {
		titleList.innerHTML = '';
	}
	clearTitleList();
	/* [DONE] for each article */
	const articles = document.querySelectorAll(
		optArticleSelector + customSelector
	);
	console.log(articles);
	/* [DONE] find all the articles and save them to variable: articles */
	let html = '';

	for (let article of articles) {
		/* [DONE] get the article id */
		const articleId = article.getAttribute('id');
		console.log(articleId);
		/* [DONE] find the title element */
		const articleTitle = article.querySelector(optTitleSelector).innerHTML;
		/*[ DONE]  get the title from the title element */
		console.log('title', articleTitle);
		/* [DONE] create HTML of the link */
		// const linkHTML =
		// 	'<li><a href="#' +
		// 	articleId +
		// 	'"><span>' +
		// 	articleTitle +
		// 	'</span></a></li>';
		// console.log(linkHTML);
		const linkHTMLData = {id: articleId, title: articleTitle};
		const linkHTML = templates.articleLink(linkHTMLData);
		/* [DONE] insert link into html variable */
		html = html + linkHTML;
		console.log(html);
	}
	titleList.innerHTML = html;

	const links = document.querySelectorAll('.titles a');

	for (let link of links) {
		link.addEventListener('click', titleClickHandler);
	}
}
generateTitleLinks();

function calculateTagsParams(tags) {
	const params = {max: 0, min: 999999};
	for (let tag in tags) {
		params.max = Math.max(tags[tag], params.max);
		params.min = Math.min(tags[tag], params.min);
		console.log(tag + ' is used ' + tags[tag] + ' times');
	}
	return params;
}
function calculateTagClass(count, params) {
	const normalizedCount = count - params.min;
	const normalizedMax = params.max - params.min;
	const percentage = normalizedCount / normalizedMax;
	const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

	return optCloudClassPrefix + classNumber;
}

function generateTags() {
	/* [NEW] create a new variable allTags with an empty array */
	let allTags = {};

	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);
	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find tags wrapper */
		const tagsWrapper = article.querySelector(optArticleTagsSelector);

		/* make html variable with empty string */
		let html = '';
		/* get tags from data-tags attribute */
		const articleTags = article.getAttribute('data-tags');
		console.log(articleTags);
		/* split tags into array */
		const articleTagsArray = articleTags.split(' ');
		console.log(articleTagsArray);
		/* START LOOP: for each tag */
		for (let tag of articleTagsArray) {
			/* generate HTML of the link */
			// const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
			const linkHTMLData = {id: tag, tag: tag};
			const linkHTML = templates.articleTagLink(linkHTMLData);
			console.log(linkHTML);
			/* add generated code to html variable */
			html = html + linkHTML;

			/* [NEW] check if this link is NOT already in allTags */
			if (!allTags[tag]) {
				/* [NEW] add tag to allTags object */
				allTags[tag] = 1;
			} else {
				allTags[tag]++;
			}
		}

		tagsWrapper.innerHTML = html;
	}
	/* END LOOP: for each tag */

	/* END LOOP: for every article: */

	/* [NEW] find list of tags in right column */
	const tagList = document.querySelector(optTagsListSelector);

	const tagsParams = calculateTagsParams(allTags);
	console.log('tagsParams:', tagsParams);
	/* [NEW] create variable for all links HTML code */
	// let allTagsHTML = '';
	const allTagsData = {tags: []};

	/* [NEW] START LOOP: for each tag in allTags: */
	for (let tag in allTags) {
		/* [NEW] generate code of a link and add it to allTagsHTML */
		// allTagsHTML += tag + ' (' + allTags[tag] + ') ';
		// const tagLinkHTML =
		// 	'<li><a class="' +
		// 	calculateTagClass(tagsParams, allTags[tag]) +
		// 	'" href="#tag-' +
		// 	tag +
		// 	'">' +
		// 	tag +
		// 	'</a> </li>';
		// console.log('tagLinkHTML:', tagLinkHTML);
		// allTagsHTML += tagLinkHTML;
		allTagsData.tags.push({
			tag: tag,
			count: allTags[tag],
			className: calculateTagClass(allTags[tag], tagsParams),
		});

		/* [NEW] END LOOP: for each tag in allTags: */
	}
	/*[NEW] add HTML from allTagsHTML to tagList */
	tagList.innerHTML = templates.tagCloudLink(allTagsData);
	console.log(allTagsData);
}
generateTags();

function tagClickHandler(event) {
	/* prevent default action for this event */
	event.preventDefault();
	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;
	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute('href');
	/* make a new constant "tag" and extract tag from the "href" constant */
	const tag = href.replace('#tag-', '');
	console.log(tag);
	/* find all tag links with class active */
	const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
	/* START LOOP: for each active tag link */
	for (let activeTag of activeTags) {
		/* remove class active */
		activeTag.classList.remove('active');
		console.log(activeTag);
		/* END LOOP: for each active tag link */
	}
	/* find all tag links with "href" attribute equal to the "href" constant */
	const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
	/* START LOOP: for each found tag link */
	for (let tagLink of tagLinks) {
		/* add class active */
		tagLink.classList.add('active');
		/* END LOOP: for each found tag link */
	}

	/* execute function "generateTitleLinks" with article selector as argument */
	generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
	/* find all links to tags */
	const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
	/* START LOOP: for each link */
	for (let tagLink of tagLinks) {
		/* add tagClickHandler as event listener for that link */
		tagLink.addEventListener('click', tagClickHandler);
		/* END LOOP: for each link */
	}
}

addClickListenersToTags();

function generateAuthors() {
	/* [NEW] create a new variable allAuthors with an empty object */
	let allAuthors = {};
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);
	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find author wrapper */
		const authorWrapper = article.querySelector(optArticleAuthorSelector);
		console.log(authorWrapper);
		/* get author from data-author attribute */
		const author = article.getAttribute('data-author');
		console.log(author);
		/* generate HTML of the link */
		//const linkHTML = '<a href="#author-' + author + '">' + author + '</a>';
		const linkHTMLData = {id: author, author: author};
		const linkHTML = templates.articleAuthorLink(linkHTMLData);
		console.log(linkHTML);
		/*insert HTML code into the author wrapper*/
		authorWrapper.innerHTML = linkHTML;
		/* [NEW] check if author is NOT already in allAuthors */
		if (!allAuthors[author]) {
			/* [NEW] add author to allAuthors object */
			allAuthors[author] = 1;
		} else {
			allAuthors[author]++;
		}
		/* END LOOP: for each article */
	}
	/* [NEW] find list of authors in right column */
	const authorList = document.querySelector(optAuthorsListSelector);
	console.log(authorList);
	/* [NEW] create variable for all links HTML code */
	//let allAuthorsHTML = '';
	const allAuthorsData = {authors: []};
	/* [NEW] START LOOP: for each tag in allTags: */
	for (let author in allAuthors) {
		/* [NEW] generate code of a link and add it to allAuthorsHTML */
		//allAuthorsHTML += author + ' (' + allAuthors[author] + ') ';
		// const authorLinkHTML =
		//   '<li><a href="#author-' +
		//   author +
		//   '">' +
		//   author +
		//   ' (' +
		//   allAuthors[author] +
		//   ') ' +
		//   '</a></li>';
		//console.log('authorLinkHTML:', authorLinkHTML);
		//allAuthorsHTML += authorLinkHTML;
		allAuthorsData.authors.push({
			author: author,
			count: allAuthors[author],
		});
		/* [NEW] END LOOP: for each tag in allTags: */
	}
	/*[NEW] add HTML from allTagsHTML to tagList */
	//authorList.innerHTML = allAuthorsHTML;
	authorList.innerHTML = templates.authorColumnLink(allAuthorsData);
}
generateAuthors();

function authorClickHandler(event) {
	/* prevent default action for this event */
	event.preventDefault();
	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;
	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute('href');
	/* make a new constant "author" and extract author from the "href" constant */
	const author = href.replace('#author-', '');
	/* find all authors links with class active */
	const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
	/* START LOOP: for each active author link */
	for (let activeAuthor of activeAuthors) {
		/* remove class active */
		activeAuthor.classList.remove('active');
		/* END LOOP: for each active tag link */
	}
	/* find all author links with "href" attribute equal to the "href" constant */
	const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
	/* START LOOP: for each found tag link */
	for (let authorLink of authorLinks) {
		/* add class active */
		authorLink.classList.add('active');
		/* END LOOP: for each found tag link */
	}
	/* execute function "generateTitleLinks" with article selector as argument */
	generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
	/* find all links to authors */
	const authorLinks = document.querySelectorAll('a[href^="#author-"]');
	/* START LOOP: for each link */
	for (let authorLink of authorLinks) {
		/* add tagClickHandler as event listener for that link */
		authorLink.addEventListener('click', authorClickHandler);
		/* END LOOP: for each link */
	}
}

addClickListenersToAuthors();
