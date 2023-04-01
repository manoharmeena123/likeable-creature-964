/* global instantsearch algoliasearch */
const search = instantsearch({
    indexName: 'instant_search',
    searchClient: algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76'),
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#searchbox',
        placeholder: 'Search for products',
    })
);

/******** Clear refinements Start ******/
// 1. Create a render function
const renderClearRefinements = (renderOptions, isFirstRender) => {
    const { hasRefinements, refine } = renderOptions;
    document.querySelector('#clear-refinements').innerHTML = `
    <button ${!hasRefinements ? 'disabled' : ''} id="clear-result" class="btn btn-primary border-0 btn-sm mr-2"><i class="ri-refresh-line mr-0"></i></button>`;
    const button = document.querySelector('#clear-result');
    button.addEventListener('click', () => {
        refine();
    });
};
const customClearRefinements = instantsearch.connectors.connectClearRefinements(
    renderClearRefinements
);
search.addWidgets([
    customClearRefinements({
        container: document.querySelector('#clear-refinements'),
    })
]);

/******** Clear refinements End ******/
// Brand List
const renderRefinementList = (renderOptions, isFirstRender) => {
	const { items, refine } = renderOptions;

	const container = document.querySelector('#brand-list');

	container.innerHTML = `
    <ul class="list-group iq-list-style-1">
      ${items
		.map(
			item => `
            <li class="mb-2 mr-0">
				<div class="d-flex justify-content-between">
					<div class="custom-control custom-checkbox">
					  <input type="checkbox" class="custom-control-input brand-checkbox" id="customCheck1${item.value}" data-value="${item.value}" value="" ${item.isRefined ? 'checked' : ''}>
					  <label class="custom-control-label" for="customCheck1${item.value}">${item.label}</label>
					</div>
					<span class="badge iq-bg-primary">(${item.count})</span>
				</div>
            </li>`
		)
		.join('')}
    </ul>
  `;
	[...container.querySelectorAll('.brand-checkbox')].forEach(element => {
		element.addEventListener('change', event => {
			event.preventDefault();
			refine(event.currentTarget.dataset.value);
		});
	});
};
const customRefinementList = instantsearch.connectors.connectRefinementList(
	renderRefinementList
);
search.addWidgets([
	customRefinementList({
		container: document.querySelector('#brand-list'),
		attribute: 'brand'
	})
]);

// Rating Menu
search.addWidget(
    instantsearch.widgets.ratingMenu({
        container: '#rating-menu',
        attribute: 'rating',
		templates: {
			item(data) {
				return `
        <a
          href="${data.url}"
          class="d-flex justify-content-between ${data.cssClasses.link}"
          aria-label="${data.name} &amp; up">
          <div>
			  ${data.stars
					.map(
						isFilled =>
							isFilled ? `<i class="ri-star-fill text-warning mr-2"></i>` : `<i class="ri-star-line text-primary mr-2"></i>`
					).join('')}
			  <span class="${data.cssClasses.label} text-primary">&amp; Up</span>
		</div>
          <span class="badge iq-bg-primary">${data.count}</span>
        </a>
      `;
			},
		},
    })
);

search.addWidget(
    instantsearch.widgets.stats({
        container: '#stats',
    })
);

search.addWidget(
    instantsearch.widgets.poweredBy({
        container: '#powered-by',
    })
);

// Free Shiping
const renderToggleRefinement = (renderOptions, isFirstRender) => {
	const { value, refine } = renderOptions;

	document.querySelector('#toggle-refinement').innerHTML = `
		<div class="custom-control custom-checkbox">
			<input type="checkbox" class="custom-control-input brand-checkbox" id="free_Ship" value="" ${value.isRefined ? 'checked' : ''}>
			<label class="custom-control-label" for="free_Ship">Free shipping</label>
		</div>
  `;
	const input = document.getElementById('toggle-refinement');
	input.addEventListener('change', event => {
		refine({ isRefined: !event.target.checked });
	});
};
const customToggleRefinement = instantsearch.connectors.connectToggleRefinement(
	renderToggleRefinement
);
search.addWidgets([
	customToggleRefinement({
		attribute: 'free_shipping',
		container: document.querySelector('#toggle-refinement'),
		// instance params
	})
]);

search.addWidget(
    instantsearch.widgets.sortBy({
        container: '#sort-by',
        cssClasses: {
            root: 'iq-algolia-sort'
        },
        items: [
            { label: 'Featured', value: 'instant_search' },
            { label: 'Price (asc)', value: 'instant_search_price_asc' },
            { label: 'Price (desc)', value: 'instant_search_price_desc' },
        ],
    })
);

search.addWidget(
    instantsearch.widgets.numericMenu({
        container: '#numeric-menu',
        attribute: 'price',
        items: [
            { label: 'All' },
            { label: 'Less than 500$', end: 500 },
            { label: 'Between 500$ - 1000$', start: 500, end: 1000 },
            { label: 'More than 1000$', start: 1000 },
        ],
    })
);

/************ Create Product Item Custom Widget Start *************/
const renderHits = (renderOptions, isFirstRender) => {
    const { hits, widgetParams } = renderOptions;

    widgetParams.container.innerHTML = `
<div class="ais-Hits iq-product">
    <ul class="ais-Hits-list iq-product-list">
      ${hits
        .map(
            (item, index) =>
                `<li key="${index}" class="ais-Hits-item iq-product-item iq-card">
                  <div class="text-center">
                  <a href="">
                      <div class="h-56 d-flex align-items-center justify-content-center bg-white iq-border-radius-15">
                        <img src="${item.image}" align="left" alt="${instantsearch.highlight({ attribute: 'image', hit: item })}" />
                      </div>
                  </a>
                  <div class="card-body">
                      <div class="text-justify">
                        <a href="javascript:void(0)">${instantsearch.highlight({ attribute: 'name', hit: item }).substring(0,20)}</a>
                        <p class="font-size-12 mb-0">${instantsearch.highlight({ attribute: 'description', hit: item }).substring(0,40)}</p>
                        <div class="ratting">
                            <ul class="ratting-item d-flex p-0 m-0">
                                <li class="full"><i class="ri-star-fill"></i></li>
                                <li class="full"><i class="ri-star-fill"></i></li>
                                <li class="full"><i class="ri-star-fill"></i></li>
                                <li class="full"><i class="ri-star-fill"></i></li>
                                <li class="full"><i class="ri-star-line"></i></li>
                            </ul>
                        </div>
                      </div>
                      <div class="iq-product-action my-2">
                          <button type="button" class="btn btn-primary iq-waves-effect text-uppercase btn-sm addToCart" id="${item.objectID}">
                            <i class="ri-shopping-cart-line mr-0"></i>
                          </button>
                          <button type="button" class="btn btn-primary iq-waves-effect text-uppercase btn-sm addToWish" id="${item.objectID}">
                            <i class="ri-heart-line mr-0"></i>
                          </button>
                          <p class="font-size-16 font-weight-bold float-right">${item.price}</p>
                      </div>
                  </div>
                </div>
            </li>`
        )
        .join('')}
    </ul>
    </div>
  `;
    $(document).on('click','.addToCart',function (e) {
        let id = $(this).attr('id')
        let item = hits.find(product => id === product.objectID)
        addToCart(item)
    })

    $(document).on('click','.addToWish',function (e) {
        let id = $(this).attr('id')
        let item = hits.find(product => id === product.objectID)
        addToWish(item)
    })
};
const customHits = instantsearch.connectors.connectHits(renderHits);
search.addWidgets([
    customHits({
        container: document.querySelector('#hits')
    })
]);
/************ Create Product Item Custom Widget End *************/

search.addWidget(
    instantsearch.widgets.pagination({
        container: '#pagination',
    })
);

search.start();
