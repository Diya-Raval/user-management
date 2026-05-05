import { SelectField } from '../common/SelectField'

type SortBy = 'name-asc' | 'name-desc' | 'age-asc' | 'age-desc'

interface UserTableFiltersProps {
  role: string
  gender: string
  sortBy: SortBy
  onRoleChange: (value: string) => void
  onGenderChange: (value: string) => void
  onSortByChange: (value: SortBy) => void
}

const roleOptions = [
  { label: 'All Roles', value: 'all' },
  { label: 'Admin', value: 'admin' },
  { label: 'Moderator', value: 'moderator' },
  { label: 'User', value: 'user' },
]

const genderOptions = [
  { label: 'All Genders', value: 'all' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

export function UserTableFilters({
  role,
  gender,
  sortBy,
  onRoleChange,
  onGenderChange,
  onSortByChange,
}: UserTableFiltersProps) {
  return (
    <>
      <SelectField id="role-filter" label="Role" value={role} onChange={(e) => onRoleChange(e.target.value)} options={roleOptions} />
      <SelectField id="gender-filter" label="Gender" value={gender} onChange={(e) => onGenderChange(e.target.value)} options={genderOptions} />
      <SelectField
        id="sort-filter"
        label="Sort by"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as SortBy)}
        options={[
          { label: 'Name (A-Z)', value: 'name-asc' },
          { label: 'Name (Z-A)', value: 'name-desc' },
          { label: 'Age (Low-High)', value: 'age-asc' },
          { label: 'Age (High-Low)', value: 'age-desc' },
        ]}
      />
    </>
  )
}
