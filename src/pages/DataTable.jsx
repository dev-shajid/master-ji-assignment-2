import React, { useEffect, useState } from 'react'
import { batches } from '../data/table'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Button } from '../components'

export default function DataTable() {
  const [filterBatches, setFilterBatches] = useState([])
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [hasNext, setHasNext] = useState(true)
  const [hasPrevious, setHasPrevious] = useState(true)
  const [searchedBatches, setSearchedBatches] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const filteredBatches = (searchValue?searchedBatches:batches).slice(page * limit, (page + 1) * limit)
    setFilterBatches(filteredBatches)
    setPageCount(Math.ceil((searchValue?searchedBatches:batches).length / limit))
    setHasNext(page < pageCount - 1)
    setHasPrevious(page > 0)
  }, [page, limit, pageCount, searchValue])

  const handleNextPage = () => {
    if (hasNext) setPage(page + 1)
  }

  const handlePreviousPage = () => {
    if (hasPrevious) setPage(page - 1)
  }

  const handleSearch = (e) => {
    const v = e.target.value.trim()
    setSearchValue(v)
    const filtered = batches.filter(batch => batch.title.toLowerCase().includes(v.toLowerCase()))
    setSearchedBatches(filtered)
    // setPageCount(Math.ceil(filtered.length / limit))
  }


  return (
    <div className='rounded-lg bg-[#F9F7F7] p-8 space-y-4 flex flex-col justify-center'>
      <h4 className='text-3xl font-semibold'>Batches</h4>
      <p className='text-gray-600 font-light'>Create learner’s batch and share information at the same time.</p>

      <div className='flex items-center gap-2'>
        <input
          type="text"
          placeholder="Search for a batch"
          className='border border-gray-300 rounded-md px-3 py-2 w-full bg-white max-w-xs'
          value={searchValue}
          onChange={handleSearch}
        />
        <Button className='!bg-[#6C6BAF] text-white'>Search</Button>
      </div>



      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="border border-black rounded-lg shadow overflow-hidden">
              <table class="min-w-full divide-y divide-gray-400">
                <thead>
                  <tr class="divide-x divide-gray-400 bg-[#F2F2F2]">
                    <th scope="col" class="px-6 py-3 text-start text-xs font-bold uppercase">Title</th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-bold uppercase">Start Date</th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-bold uppercase">End Date</th>
                    <th scope="col" class="px-6 py-3 text-end text-xs font-bold uppercase">Price</th>
                    <th scope="col" class="px-6 py-3 text-end text-xs font-bold uppercase">Validity/Expiry</th>
                    <th scope="col" class="px-6 py-3 text-end text-xs font-bold uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filterBatches.map((course, i) => (
                      <tr key={i} class="divide-x divide-gray-400">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-2">
                          <img src={course.imageUrl} className='aspect-video max-w-28 w-full rounded-md object-cover bg-gray-400' />
                          {course.title}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{course.startDate}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{course.endDate}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{course.price}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{course.validityExpiry}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <div className={`${course.status=='Published'?'bg-[#DBFFCE] border-[#4ED04B]':'bg-[#F3F3F3] border-[#A4A4A4]'} inline-block border font-light rounded-sm text-xs px-2 py-0.5 capitalize`}>{course.status}</div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-end gap-4'>
        <p>Rows per page</p>
        {/* <div className='border border-gray-300 p-2 py-1.5 rounded-md inline-block'> */}
        <select
          name="limit"
          id="limit"
          onChange={(e) => setLimit(e.target.value)}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:!ring-0 focus:!border-none block p-2.5'
        >
          <option selected value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        {/* </div> */}
        <div className='flex items-center gap-1'>
          <FaAngleLeft onClick={handlePreviousPage} className={`size-5 ${hasPrevious ? 'cursor-pointer' : 'cursor-not-allowed opacity-20'}`} />
          <FaAngleRight onClick={handleNextPage} className={`size-5 ${hasNext ? 'cursor-pointer' : 'cursor-not-allowed opacity-20'}`} />
        </div>
      </div>
    </div>
  )
}
