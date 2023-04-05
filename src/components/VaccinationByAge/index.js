import {PieChart, ResponsiveContainer, Pie, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAgeList} = props

  return (
    <div className="vaccination-coverage-section">
      <h1 className="coverage-heading">Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie cx="50%" cy="45%" data={vaccinationByAgeList} dataKey="count">
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill=" #64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
