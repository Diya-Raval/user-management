import { InputField } from '../common/InputField'
import { SelectField } from '../common/SelectField'

interface UserFiltersProps {
  search: string
  role: string
  gender: string
  sortBy: string
  roleOptions: Array<{ label: string; value: string }>
  genderOptions: Array<{ label: string; value: string }>
  onSearchChange: (value: string) => void
  onRoleChange: (value: string) => void
  onGenderChange: (value: string) => void
  onSortByChange: (value: string) => void
}

export function UserFilters({
  search,
  role,
  gender,
  sortBy,
  roleOptions,
  genderOptions,
  onSearchChange,
  onRoleChange,
  onGenderChange,
  onSortByChange,
}: UserFiltersProps) {
  return (
    <section className="filters-grid">
      <InputField
        id="search"
        label="Search by name or email"
        placeholder="Type first name, last name, or email"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <SelectField
        id="role"
        label="Filter by role"
        value={role}
        onChange={(event) => onRoleChange(event.target.value)}
        options={[{ label: 'All Roles', value: 'all' }, ...roleOptions]}
      />
      <SelectField
        id="gender"
        label="Filter by gender"
        value={gender}
        onChange={(event) => onGenderChange(event.target.value)}
        options={[{ label: 'All Genders', value: 'all' }, ...genderOptions]}
      />
      <SelectField
        id="sortBy"
        label="Sort by"
        value={sortBy}
        onChange={(event) => onSortByChange(event.target.value)}
        options={[
          { label: 'Name (A-Z)', value: 'name-asc' },
          { label: 'Name (Z-A)', value: 'name-desc' },
          { label: 'Age (Low-High)', value: 'age-asc' },
          { label: 'Age (High-Low)', value: 'age-desc' },
        ]}
      />
    </section>
  )
}
