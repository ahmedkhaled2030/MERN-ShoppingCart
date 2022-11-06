import React from 'react'

function Table({ data }) {
    // console.log(data)
    return (
        <table>
          <tbody>
            <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>
            </tr>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.desc}</td>
                <td>{item.title}</td>
                <td>{item.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default Table