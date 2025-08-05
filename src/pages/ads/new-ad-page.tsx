import "./new-ad-page.css";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Page from "../../components/layout/page";
import FormField from "../../components/ui/form-field";
import Button from "../../components/ui/button";
import { useAdCreate, useFetchTags } from "../../store/hooks";

const NewAdvertPage = () => {
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState<number | "">("");
  const [selectedTypeInput, setSelectedTypeInput] = useState("");
  /* const [tags, setTags] = useState([]); */
  const [selectedTagsInput, setSelectedTagsInput] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const isDisabled =
    !nameInput ||
    !priceInput ||
    !selectedTypeInput ||
    !selectedTagsInput.length;

  const createAd = useAdCreate();
  const tags = useFetchTags();

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };

  const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const productPrice = event.target.value;
    setPriceInput(productPrice === "" ? "" : Number(productPrice));
  };

  const handleChangeType = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedTypeInput(event.target.value);
  };

  const handleChangeTags = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedTagsInput([...selectedTagsInput, event.target.value]);
    } else {
      const newTagsSelected = [...selectedTagsInput].filter(
        (tag) => tag !== event.target.value,
      );
      setSelectedTagsInput(newTagsSelected);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const adToUpload = new FormData();
    adToUpload.append("name", nameInput);
    adToUpload.append("sale", selectedTypeInput === "sell" ? "true" : " false");
    adToUpload.append("price", String(priceInput));
    selectedTagsInput.forEach((tag) => adToUpload.append("tags", tag));
    const file = fileRef.current?.files?.[0];
    if (file) {
      adToUpload.append("photo", file);
    }

    await createAd(adToUpload);
  };

  return (
    <Page title="Create new ad">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-element">
          <FormField
            label="Product name"
            classNameLabel="form-label"
            classNameInput="form-input"
            type="text"
            name="product-name"
            value={nameInput}
            onChange={handleChangeName}
            required
          />
        </div>

        <div className="form-element">
          <FormField
            label="Price(€)"
            classNameLabel="form-label"
            classNameInput="form-input"
            type="number"
            name="product-price"
            value={priceInput}
            onChange={handleChangePrice}
            required
          />
        </div>

        <fieldset className="field type-field">
          <label className="fieldset-label">Ad type</label>
          <div className="types">
            <div className="type-option">
              <input
                type="radio"
                name="ad-type"
                id="sell-product"
                value="sell"
                checked={selectedTypeInput === "sell"}
                onChange={handleChangeType}
                required
              />
              <label htmlFor="sell-product" className="type-option">
                Sell
              </label>
            </div>

            <div className="type-option">
              <input
                type="radio"
                name="ad-type"
                id="buy-product"
                value="buy"
                checked={selectedTypeInput === "buy"}
                onChange={handleChangeType}
                required
              />
              <label htmlFor="buy-product" className="type-option">
                Buy
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset className="field tags-field">
          <label className="fieldset-label">Tags</label>
          <div className="tag-options">
            {tags.map((tag) => {
              return (
                <div className="tag" key={tag}>
                  <input
                    type="checkbox"
                    name={tag}
                    id={tag}
                    value={tag}
                    checked={selectedTagsInput.includes(tag)}
                    onChange={handleChangeTags}
                  />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div className="file-container">
          <label className="upload-img-label">Upload image</label>
          <div className="upload-img-container">
            <input
              type="file"
              name="product-img"
              id="product-img"
              ref={fileRef}
            />
          </div>
        </div>
        <Button type="submit" className="form-btn" disabled={isDisabled}>
          Create
        </Button>
      </form>
    </Page>
  );
};

export default NewAdvertPage;
