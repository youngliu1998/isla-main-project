import { useState } from 'react'
import { useCombobox } from 'downshift'
import {
  BsSearch,
  BsX,
  BsChevronRight,
  BsArrowDown,
  BsStarFill,
} from 'react-icons/bs'
import './_style.css/sidebar-filter-desktop.css'
import DesktopFilterButtons from './desktop-filter-buttons.js'
import FilterStarRatingButtons from './rating-filter-buttons.js'

const brands = ['Unleashia', 'Cosnori', 'Muzigae Mansion', 'Kaja', 'rom&nd']
const categories = ['眼影', '唇蜜', '口紅', '粉底', '氣墊粉餅']
const priceRanges = ['500元以下', '500 - 1000', '1000 - 2000', '2000 元以上']
const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
]

export default function SidebarFilter({ onFilterChange }) {
  const [searchInputItems, setSearchInputItems] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])
  const [selectedPrices, setSelectedPrices] = useState([])

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: searchInputItems,
    inputValue,
    onInputValueChange: async ({ inputValue }) => {
      setInputValue(inputValue)
      // TODO: Call API to get search suggestions
    },
    onSelectedItemChange: ({ selectedItem }) => {
      // Handle selection
    },
  })

  const toggleSelection = (item, selectedItems, setSelectedItems) => {
    const newSelection = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item]
    setSelectedItems(newSelection)
    onFilterChange?.({
      brands: selectedBrands,
      categories: selectedCategories,
      ratings: selectedRatings,
      prices: selectedPrices,
    })
  }

  return (
    <div className="col sidebar-filter-filter">
      <div className="sidebar-filter-filter-top">
        <div className="sidebar-filter-search-box d-flex justify-content-center align-items-center flex-row w-100 px-3 gap-3">
          <BsSearch className="sidebar-filter-search-icon d-flex" />
          <div className="sidebar-filter-search-input w-100">
            <input
              className="w-100 sidebar-filter-search"
              type="text"
              placeholder="你想要找什麼呢？"
              {...getInputProps()}
            />
          </div>
          <a href="#" className="list-unstyled text-black">
            <BsX className="sidebar-filter-search-x-icon" />
          </a>
        </div>
        <div className="sidebar-filter-order-box d-flex flex-column">
          <div className="sidebar-filter-order-label">排序方式</div>
          <div className="sidebar-filter-order-menu d-flex">
            <div className="col d-flex justify-content-start align-items-center w-100">
              <a
                href=""
                className="sidebar-filter-order-btn sidebar-filter-order-btn-active"
              >
                價格
              </a>
              <a href="" className="sidebar-filter-order-btn">
                評分
              </a>
              <a href="" className="sidebar-filter-order-btn">
                上架日期
              </a>
            </div>
            <div className="sidebar-filter-order-order">
              <BsArrowDown />
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-filter-main-filter-box d-flex flex-column">
        <div className="sidebar-filter-link-box">
          <div className="sidebar-filter-link ">
            <a href="">
              最新商品
              <BsChevronRight />
            </a>
          </div>
        </div>

        <div className="sidebar-filter-filter-menu">
          <div className="sidebar-filter-filter-label">品牌</div>
          <DesktopFilterButtons
            options={brands}
            selected={selectedBrands}
            onToggle={(option, selected) =>
              toggleSelection(option, selected, setSelectedBrands)
            }
          />
        </div>

        <div className="sidebar-filter-filter-menu">
          <div className="sidebar-filter-filter-label">種類</div>
          <DesktopFilterButtons
            options={categories}
            selected={selectedCategories}
            onToggle={(option, selected) =>
              toggleSelection(option, selected, setSelectedCategories)
            }
          />
        </div>

        <div className="sidebar-filter-filter-menu">
          <div className="sidebar-filter-filter-label">評分</div>
          <FilterStarRatingButtons
            maxStar={5}
            selected={selectedRatings}
            onToggle={(option, selected) =>
              toggleSelection(option, selected, setSelectedRatings)
            }
          />
        </div>

        <div className="sidebar-filter-filter-menu">
          <div className="sidebar-filter-filter-label">價格</div>
          <div className="sidebar-filter-filter-btn-container">
            {priceRanges.map((range) => (
              <div
                key={range}
                className="sidebar-filter-filter-btn"
                onClick={() =>
                  toggleSelection(range, selectedPrices, setSelectedPrices)
                }
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedPrices.includes(range)}
                  readOnly
                />
                <div className="sidebar-filter-input-label">{range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
