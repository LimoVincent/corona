import '../Table.css'

export default function Table({ countries }) {
  return (
    <div className='table'>
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <strong>
            <td>{cases}</td>
          </strong>
        </tr>
      ))}
    </div>
  )
}
