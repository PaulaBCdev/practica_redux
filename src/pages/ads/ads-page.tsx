import "./ads-page.css";
import { lazy, type ChangeEvent } from "react";
import Page from "../../components/layout/page";
import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";
import { useAppDispatch, useAppSelector } from "../../store";
import { getFilters, getMaxPrice } from "../../store/selectors";
import { useAdsLoaded, useFetchTags, useFilters } from "../../store/hooks";
import { filtersApplied } from "../../store/actions";

const AdsList = lazy(() => import("./ads-list"));

interface Props {
  areFilters: boolean;
}

function EmptyList({ areFilters }: Props) {
  return areFilters ? (
    <div className="no-filter-matches">
      There are no ads matching your search.
    </div>
  ) : (
    <div className="ads-page-empty">
      <p>There are no adverts posted yet.</p>
      <p>Be the first one!</p>
      <Button>CREATE AD</Button>
    </div>
  );
}

function AdvertsPage() {
  const dispatch = useAppDispatch();

  const filters = useAppSelector(getFilters); // current filter state
  const tags = useFetchTags(); // tags fetched from DB

  // Load ads
  useAdsLoaded();

  const { applyFilters, resetFilters } = useFilters();
  const filteredAds = applyFilters(); // return filtered ads

  const maxPrice = useAppSelector(getMaxPrice);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(filtersApplied({ ...filters, name: event.target.value }));
  };

  const handleChangeSale = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "sell";
    dispatch(filtersApplied({ ...filters, sale: value }));
  };

  const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const maxValue = parseInt(event.target.value);
    dispatch(filtersApplied({ ...filters, price: [0, maxValue] }));
  };

  function handleCheckTags(event: ChangeEvent<HTMLInputElement>) {
    let newSelected = [...filters.tags];
    if (event.target.checked) {
      newSelected.push(event.target.value);
    } else {
      newSelected = newSelected.filter((tag) => tag !== event.target.value);
    }

    dispatch(filtersApplied({ ...filters, tags: newSelected }));
  }

  const handleDeleteFilters = () => {
    resetFilters();
  };

  const isFiltering =
    filters.name !== "" ||
    filters.price !== null ||
    filters.sale !== null ||
    filters.tags.length > 0;

  return (
    <Page title="">
      <div className="adverts-main-page">
        <section className="ads-filter">
          <label className="filters-title">Filters</label>
          <div className="filters-div">
            <FormField
              label="Name"
              classNameLabel="name-filter-label"
              classNameInput="name-filter-input"
              type="text"
              name="name"
              value={filters.name || ""}
              onChange={handleChangeName}
            />

            <div className="sale-filter">
              <label className="filters-label">Ad type</label>
              <div className="sale-elements">
                <div className="sale-element">
                  <input
                    type="radio"
                    id="sell"
                    name="sale"
                    value="sell"
                    checked={filters.sale === true}
                    onChange={handleChangeSale}
                  />
                  <label htmlFor="sell">Sell</label>
                </div>

                <div className="sale-element">
                  <input
                    type="radio"
                    id="buy"
                    name="sale"
                    value="buy"
                    checked={filters.sale === false}
                    onChange={handleChangeSale}
                  />
                  <label htmlFor="buy">Buy</label>
                </div>
              </div>
            </div>

            <div className="price-filter">
              <label className="filters-label">Price</label>
              <div className="price-elements">
                <input
                  type="range"
                  min="0"
                  max={maxPrice?.toString()}
                  value={filters.price?.[1] || 0}
                  className="slider"
                  id="price-slider"
                  onChange={handleChangePrice}
                />
                <label className="show-price" htmlFor="price-slider">
                  Price range: 0 - {filters.price?.[1] || 0}
                </label>
              </div>
            </div>

            <div className="tags-filter">
              <label className="filters-label">Tags</label>
              <div className="tags-elements">
                {tags.map((tag) => {
                  return (
                    <div className="tag" key={tag}>
                      <input
                        type="checkbox"
                        name={tag}
                        id={tag}
                        value={tag}
                        checked={filters.tags.includes(tag)}
                        onChange={handleCheckTags}
                      />
                      <label htmlFor={tag}>{tag}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="filter-btns">
            <Button
              className="delete-filters-btn"
              onClick={handleDeleteFilters}
            >
              DELETE FILTERS
            </Button>
          </div>
        </section>
        <section className="ads-page">
          {!filteredAds.length ? (
            <EmptyList areFilters={isFiltering} />
          ) : (
            <AdsList list={filteredAds} />
          )}
        </section>
      </div>
    </Page>
  );
}

export default AdvertsPage;

/*  <Button className="apply-filters-btn" onClick={handleApplyFilters}>
              APPLY FILTERS
            </Button> */
