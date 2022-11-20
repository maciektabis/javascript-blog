('use strict');

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
	optArticleAuthorSelector = '.post-author';
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
		const linkHTML =
			'<li><a href="#' +
			articleId +
			'"><span>' +
			articleTitle +
			'</span></a></li>';
		console.log(linkHTML);
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

function generateTags() {
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);
	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find tags wrapper */
		const titleList = article.querySelector(optArticleTagsSelector);
		console.log(titleList);
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
			const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
			console.log(linkHTML);
			/* add generated code to html variable */
			html = html + linkHTML;
		}
		/* END LOOP: for each tag */
		titleList.innerHTML = html;
		/* END LOOP: for every article: */
	}
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
		const linkHTML = '<a href="#author-' + author + '">' + author + '</a>';
		console.log(linkHTML);
		/*insert HTML code into the author wrapper*/
		authorWrapper.innerHTML = linkHTML;
	}
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
