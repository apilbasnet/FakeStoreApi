import { useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa"
import { Table, Badge, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';




function SearchBar() {
    const [product, setProduct] = useState([])
    const [isFocused, setIsFocused] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('None');
    const [selectedPrice, setSelectedPrice] = useState("None")






    useEffect(() => {

        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setProduct(response.data);
                setFilteredData(response.data)

            })
            .catch(err => console.log("Couldn't fetch the data." + err));

        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();

                document.getElementById('searchInput').focus();
                setIsFocused(true);
            }
            else if (event.keyCode === 27) {
                event.preventDefault();
                document.getElementById('searchInput').blur();
                setIsFocused(false);

            }
        };


        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };



    }, [])



    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleCategoryChange = (category) => {

        setSelectedCategory(category);
        filterData(category,selectedPrice);
        // setSelectedPrice("None")
    }
    const handlePriceChange = (price) => {
        setSelectedPrice(price);
        filterData(selectedCategory, price)




    }


    const filterData = (category, price) => {
        if (category === "None" && price === "None") {
            setFilteredData(product);
        } else {
            setFilteredData(
                product.filter(
                    (x) =>{
                        // x.title.toLowerCase().includes(selectedCategory.toLowerCase()) &&
                        const categoryMatch = category ==="None" || x.category.toLowerCase() === category.toLowerCase();
                        const priceMatch = 
                        (price === "None") ||
                        (price === 20 && x.price < 20) ||
                        (price === 50 && x.price < 50) ||
                        (price === 100 && x.price < 100) ||
                        (price === 200 && x.price < 200) ||
                        (price === 500 && x.price < 500) ||
                        (price === 700 && x.price < 700) ||
                        (price === 1000 && x.price < 1000) ||
                        (price === 5000 && x.price < 5000);
                        return categoryMatch && priceMatch ; 
                        
                    }
                )
            );
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const searchValue = event.target.value.toLowerCase();
        setFilteredData(product.filter(x =>
            x.title.toLowerCase().includes(searchValue) &&
            (selectedCategory === 'None' || x.category.toLowerCase() === selectedCategory.toLowerCase()) &&
            (selectedPrice === 'None' || x.price <= selectedPrice)
        ));
        
    }



    console.log(filteredData);
    console.log(selectedPrice);

    return (
        <>
            <div className='   w-[80%] h-[80%] m-auto   flex flex-col justify-center items-center'>


                <div className={` my-3 relative w-[40rem]  `}>

                    <div className="absolute top-3 left-3 ">
                        <FaSearch />
                    </div>

                    <input
                        id="searchInput"
                        type="text"
                        placeholder="Search"
                        className={` pl-10 pr-4 py-2 w-full  border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-x-zinc-900`}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleSearch}
                    />


                    { !isFocused && (

                        <div className='absolute top-2 right-2 border border-gray-900  rounded-lg px-1  ' aria-disabled >
                            <p className='text-neutral-800'>Ctrl K</p>
                        </div>



                    )}

                   

                    <div className='flex'>
                        <label className='mt-2 mr-2 text-sm  text-neutral-500 '> Category

                            <Dropdown >
                                <Dropdown.Toggle className='bg-zinc-500 min-w-[11rem] flex justify-between items-center' variant="secondary" id="dropdown-basic">
                                    {selectedCategory}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleCategoryChange('None')}>None</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleCategoryChange("Men's clothing")} >Men's Clothing</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleCategoryChange("Jewelery")} >Jewelery</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleCategoryChange("Electronics")} >Electronics</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleCategoryChange("Women's clothing")} >Women's Clothing</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </label>

                        <label className='mt-2 mr-2 text-sm  text-neutral-500' > Price
                            <Dropdown >
                                <Dropdown.Toggle className='bg-zinc-500 min-w-[11rem] flex justify-between items-center ' variant="secondary" id="dropdown-basic">
                                    {selectedPrice}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handlePriceChange('None')}>None</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handlePriceChange(20)}>less than $20 </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handlePriceChange(50)}>less than $50</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handlePriceChange(100)}>less than $100</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handlePriceChange(200)}>less than $200</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handlePriceChange(500)}>less than $500</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handlePriceChange(700)}>less than $700</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handlePriceChange(1000)}>less than $1000</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handlePriceChange(5000)}>less than $5000</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </label>


                    </div>
              






                </div>
                <div>


                    <Table className='max-w-full' bordered striped>

                        <thead>
                            <tr>
                                <th>S.N</th>
                                <th>Title</th>
                                <th>Price($)</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Ratings</th>
                            </tr>


                        </thead>
                        <tbody className=''>
                            {filteredData.map((data) => {
                                return <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.title}</td>
                                    <td>{data.price}</td>
                                    <td>{data.description}</td>
                                    <td>{data.category}</td>
                                    <td>{data.rating.rate >= 2.5 ? <Badge bg="success">{data.rating.rate}</Badge> : <Badge bg="danger">{data.rating.rate}</Badge>}</td>
                                </tr>

                            })}

                        </tbody>


                    </Table>




                </div>
            </div>




        </>
    )
}

export default SearchBar;