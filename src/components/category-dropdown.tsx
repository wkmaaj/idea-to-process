import { BarsArrowDownIcon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction } from 'react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui'

const categories = [
  'Finance',
  'Human Resources (HR)',
  'Operations',
  'Sales and Marketing',
  'IT and Technology',
  'Product Development',
  'Legal and Compliance',
  'Customer Service',
  'Project Management',
  'Strategy and Planning',
  'Compliance and Risk',
  'To be implemented'
]

type CategoryDropdownProps = {
  selectedCategory: string
  setSelectedCategory: Dispatch<SetStateAction<string>>
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  setSelectedCategory
}) => {
  const handleSelectCategory = (category: string) =>
    setSelectedCategory(category)

  return (
    <div className="flex flex-col category-dropdown">
      <p className="mb-2">Requirement Category</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <div className="flex items-center space-x-2">
              <span>{selectedCategory || 'Select a category'}</span>
              <BarsArrowDownIcon className="size-3.5" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => handleSelectCategory(category)}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CategoryDropdown
