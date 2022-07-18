import React, { useState } from 'react'
import { Card } from '../components/Card';
import axios from 'axios';
import { getAllCategory, getAllProducts } from '../service/product';

export const CardLayout = () => {
    const [products, setProducts] = useState([]);
    const [tempProducts, setTempProducts] = useState([])
    const [search, setSearch] = useState("")
    const [categories, setCategories] = useState([]);

    const [isCategoryPresent, setCategoryState] = useState(false);
    const [isSearching, setSearchState] = useState(false);

    // memory buffer
    const [recentPastData, setPastData] = useState([]);

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
