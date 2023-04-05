import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGenderList} = props

  return (
    <div className="vaccination-coverage-section">
      <h1 className="coverage-heading">Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            cx="50%"
            cy="45%"
            data={vaccinationByGenderList}
            startAngle={180}
            endAngle={0}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
            className="pie"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill=" #5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
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

export default VaccinationByGender
