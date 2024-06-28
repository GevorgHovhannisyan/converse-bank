import { useRef, useState } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import './search.scss';

const Search = () => {
  const intl = useIntl();

  const [isOpen, setOpen] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const [value, setValue] = useState('');

  const inputRef = useRef();
  const {lang} = useParams();

  const openSearch = (e) => {
    setCreate(true);
    setTimeout(() => {
      setOpen(true);
    }, 1);
    setTimeout(() => {
      inputRef.current.focus();
    }, 500);
  };

  const closeSearch = (e) => {
    setOpen(false);
    setTimeout(() => {
      setCreate(false);
      setValue('')
    }, 300);
  };

  const placeholderText = defineMessage({
    id: 'Search in website',
  });

  const onSearch = (e) => {
    e.preventDefault()
    setValue(e.target.value);
  };

  const getSearchQuery = (e) => {
    e.preventDefault()
    const searchUrl  = `https://www.conversebank.am/${lang?lang:'hy'}/search/?query=${value}&search=1`
    window.open(searchUrl, '_blank');
  };

  return (
    <div className={`search_block ${isOpen ? 'opened' : ''}`}>
      <button
        className="action_btn icon_search"
        onClick={openSearch}
        aria-label="search open"
      ></button>
      {isCreate && (
        <div className="search_inner">
          <form className="search_form" target="_blank"  onSubmit={ getSearchQuery}>
            <label className="search_field">
              <span className="hidden_label">Search</span>
              <input
                type="text"
                ref={inputRef}
                value={value}
                onChange={onSearch}
                name="search"
                autoComplete="off"
                placeholder={intl.formatMessage(placeholderText)}
              />
            </label>
            <button
              type="submit"
              className="search_btn icon_search"
              aria-label="search"
            ></button>
          </form>
          <button
            className="search_close icon_close"
            aria-label="search close"
            onClick={closeSearch}
          ></button>
        </div>
      )}
    </div>
  );
};

export default Search;