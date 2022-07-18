import React, { useState } from 'react'
import { Card } from '../components/Card';
import { getAllCategory, getAllProducts } from '../service/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export const CardLayout = () => {
    const [products, setProducts] = useState([]);
    const [tempProducts, setTempProducts] = useState([])
    const [search, setSearch] = useState("")
    const [categories, setCategories] = useState([]);

    const [isCategoryPresent, setCategoryState] = useState(false);
    const [isSearching, setSearchState] = useState(false);

    // memory buffer

    const handleSearch = () => {
        if (search !== "") {
            if (isCategoryPresent){
                setSearchState(true);
                const searchedProducts = products.filter(data => data.title.includes(search) || data.description.includes(search))
                setProducts(searchedProducts)
            } else {
                setSearchState(true);
                const searchedProducts = tempProducts.filter(data => data.title.includes(search) || data.description.includes(search))
                setProducts(searchedProducts)
            }
        } else {
            setProducts(tempProducts)
            setSearchState(false);
        }
    }

    const handleCategoryChange = (e) => {
        const { value } = e.target
        if (value !== "null") {
            if (isSearching){
                setCategoryState(true);
                const searchedProducts = products.filter(data => data.category.includes(value))
                setProducts(searchedProducts);
            } else{
                setCategoryState(true);
                const searchedProducts = tempProducts.filter(data => data.category.includes(value))
                setProducts(searchedProducts);
            }
        } else {
            setProducts(tempProducts)
            setCategoryState(false);
        }
    }

    const handleRangeChange = (e) => {
        const start = e.target.value.split('-')[0];
        const end = e.target.value.split('-')[1];

        console.log(start, end);
    }

    const handleRatingChange = (e) => {
        const start = e.target.value.split('-')[0];
        const end = e.target.value.split('-')[1];

        console.log(start, end);
    }

    React.useEffect(() => {
        getAllProducts()
            .then(res => {
                setProducts(res.data)
                setTempProducts(res.data)
                getAllCategory().then(res => setCategories(res.data))
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <section className='cardLayout__wrapper'>
            <section className='searchFilter'>
                <div className='search'>
                    <input type="search" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} className='searchInput' />
                    <button className='searchBtn' onClick={handleSearch}>Search</button>
                </div>
                <div className='filter_input'>
                    <select className='select__input select__input__category' onChange={handleCategoryChange}>
                        <option value={"null"} defaultChecked>Select a category</option>
                        {
                            categories.map((category) => {
                                return (
                                    <option value={category}>{category}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='filter_input'>
                    <form className='select__range'>
                        <div className='range__checkbox'>
                            <input type="checkbox" onChange={handleRangeChange} id='checkbox1' name="checkbox1" value="10-100" />
                            <label for="checkbox1">$10 - $100</label>
                        </div>
                        <div className='range__checkbox'>
                            <input type="checkbox" onChange={handleRangeChange} id='checkbox2' name="checkbox2" value="100-500" />
                            <label for="checkbox2">$100 - $500</label>
                        </div>
                        <div className='range__checkbox'>
                            <input type="checkbox" onChange={handleRangeChange} id='checkbox3' name="checkbox1" value="500-1000" />
                            <label for="checkbox3">$500 - $1,000</label>
                        </div>
                    </form>
                </div>

                <div className='filter_input'>
                    <form className='select__range'>
                        <div className='range__checkbox'>
                            <input type="checkbox" id='checkbox1' name="checkbox1" value="4-5" />
                            <label for="checkbox1"><span>
                            <FontAwesomeIcon icon={faStar} />
                            </span> 4 & above</label>
                        </div>
                        <div className='range__checkbox'>
                            <input type="checkbox" id='checkbox2' name="checkbox2" value="3-5" />
                            <label for="checkbox2"><span>
                            <FontAwesomeIcon icon={faStar} />
                            </span> 3 & above</label>
                        </div>
                        <div className='range__checkbox'>
                            <input type="checkbox" id='checkbox3' name="checkbox1" value="2-5" />
                            <label for="checkbox3"><span>
                            <FontAwesomeIcon icon={faStar} />
                            </span> 2 & above</label>
                        </div>
                        <div className='range__checkbox'>
                            <input type="checkbox" id='checkbox3' name="checkbox1" value="2-5" />
                            <label for="checkbox3"><span>
                            <FontAwesomeIcon icon={faStar} />
                            </span> 1 & above</label>
                        </div>
                    </form>
                </div>
            </section>
            <ul className='wrapper__cardList'>
                {
                    products.map((product, index) => {
                        return (
                            <Card key={index} product={product} />
                        )
                    })
                }
            </ul>
        </section>
    )
}


/*
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          renderValue={(selected) => selected.join(', ')}
        >
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
        </Select>

*/