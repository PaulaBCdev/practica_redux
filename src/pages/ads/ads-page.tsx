import "./ads-page.css";
import { lazy, useEffect, useState, type ChangeEvent } from "react";
import type { FiltersType, AdvertType } from "./types";
import Page from "../../components/layout/page";
import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";
import { useAppSelector } from "../../store";
import {
  getFilters,
  getFiltersName,
  getFiltersPrice,
  getFiltersSale,
  getFiltersTags,
} from "../../store/selectors";
import { useFetchTags } from "../../store/hooks";

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
  const [ads, setAds] = useState<AdvertType[]>([]);
  const [showingAds, setShowingAds] = useState<AdvertType[]>([]);

  //FILTERS STATES

  /* const [appliedFilters, setAppliedFilters] = useState<FiltersType>({});

  const [nameInput, setNameInput] = useState("");

  const [selectedSaleInput, setSelectedSaleInput] = useState("");

  const [priceInput, setPriceInput] = useState("0");
  const [maxPrice, setMaxPrice] = useState("5000");

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]); */

  const appliedFilters = useAppSelector(getFilters);
  const appliedFilterName = useAppSelector(getFiltersName);
  const appliedFilterPrice = useAppSelector(getFiltersPrice);
  const appliedFilterSale = useAppSelector(getFiltersSale);
  const appliedFilterTags = useAppSelector(getFiltersTags);
  const tags = useFetchTags();

  useEffect(() => {
    async function getAds() {
      const ads = await getLatestAdverts();
      setAds(ads);
      setShowingAds(ads);

      //price filter
      let maxPrice = 0;
      ads.forEach((ad) => {
        if (ad.price > maxPrice) {
          maxPrice = ad.price;
        }
      }); // setea el price filter para que, por defecto, aparezca con el precio mas alto de entre todos los ads
      setPriceInput(maxPrice.toString());
      setMaxPrice(maxPrice.toString());

      //tags filter
      const tags = await getTags();
      setTags(tags);
    }
    getAds();
  }, []);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };

  const handleChangeSale = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedSaleInput(event.target.value);
  };

  const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceInput(event.target.value);
  };

  function handleCheckTags(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setSelectedTags([...selectedTags, event.target.value]);
    } else {
      const newSelected = [...selectedTags].filter(
        (tag) => tag !== event.target.value,
      );
      setSelectedTags(newSelected);
    }
  }

  const handleApplyFilters = () => {
    const newFilters: FiltersType = {};
    if (nameInput) {
      newFilters.name = nameInput;
    }
    if (selectedSaleInput) {
      if (selectedSaleInput === "sell") {
        newFilters.sale = true;
      } else {
        newFilters.sale = false;
      }
    }
    if (priceInput) {
      newFilters.price = [0, parseInt(priceInput)];
    }
    if (selectedTags) {
      newFilters.tags = selectedTags;
    }
    setAppliedFilters(newFilters);
  };

  const handleDeleteFilters = () => {
    setAppliedFilters({});
  };

  /* useEffect(() => {
    const applyFilters = () => {
      const filteredAds = ads.filter((ad) => {
        const nameMatches = !!appliedFilters.name
          ? ad.name.toLowerCase().startsWith(appliedFilters.name.toLowerCase())
          : true;
        const priceMatches = !!appliedFilters.price
          ? appliedFilters.price[0] <= ad.price &&
            ad.price <= appliedFilters.price[1]
          : true;
        const saleMatches =
          appliedFilters.sale !== undefined
            ? ad.sale === appliedFilters.sale
            : true;
        let tagsMatches = true;
        !!appliedFilters.tags?.length &&
          appliedFilters.tags.forEach((tag) => {
            if (!ad.tags.includes(tag)) tagsMatches = false;
          });

        return nameMatches && priceMatches && saleMatches && tagsMatches;
      });
      setShowingAds(filteredAds);
    };
    applyFilters();
  }, [appliedFilters]); */

  useEffect(() => {
    const filteredAds = ads.filter((ad) => {
      const nameMatches = appliedFilterName
        ? ad.name.toLowerCase().startsWith(appliedFilterName.toLowerCase())
        : true;

      const priceMatches = appliedFilterPrice
        ? appliedFilterPrice[0] <= ad.price && ad.price <= appliedFilterPrice[1]
        : true;

      const salesMatches =
        appliedFilterSale !== null ? ad.sale === appliedFilterSale : true;

      let tagsMatches = true;
      if (appliedFilterTags.length) {
        appliedFilterTags.forEach((tag) => {
          if (!ad.tags.includes(tag)) tagsMatches = false;
        });
      }
    });
  }, [
    ads,
    appliedFilterName,
    appliedFilterPrice,
    appliedFilterSale,
    appliedFilterTags,
  ]);

  const isFiltering =
    appliedFilters.name !== undefined ||
    appliedFilters.price !== undefined ||
    appliedFilters.sale !== undefined ||
    appliedFilters.tags !== undefined;

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
              value={nameInput}
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
                    checked={selectedSaleInput === "sell"}
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
                    checked={selectedSaleInput === "buy"}
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
                  max={maxPrice}
                  value={priceInput}
                  className="slider"
                  id="price-slider"
                  onChange={handleChangePrice}
                />
                <label className="show-price" htmlFor="price-slider">
                  Price range: 0 - {priceInput}
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
                        checked={selectedTags.includes(tag)}
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
            <Button className="apply-filters-btn" onClick={handleApplyFilters}>
              APPLY FILTERS
            </Button>
            <Button
              className="delete-filters-btn"
              onClick={handleDeleteFilters}
            >
              DELETE FILTERS
            </Button>
          </div>
        </section>
        <section className="ads-page">
          {!showingAds.length ? (
            <EmptyList areFilters={isFiltering} />
          ) : (
            <AdsList list={showingAds} />
          )}
        </section>
      </div>
    </Page>
  );
}

export default AdvertsPage;
