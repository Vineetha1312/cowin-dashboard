import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccinationList} = props

  const DataFormatter = number => {
    if (number > 10000) {
      return `${(number / 10000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vaccination-coverage-section">
      <h1 className="coverage-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={last7DaysVaccinationList}
          margin={{top: 5}}
          width={1000}
          height={300}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: '#6c757d', strokeWidth: 1}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{stroke: '#6c757d', strokeWidth: 0}}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar dataKey="dose1" name="Dose 1" fill="#2d87bb" barSize="20%" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
