import Paragraph from './Paragraph'


function Content({ theme }) {

  console.log('Re-render')
  return (
    <div>
      <Paragraph />
    </div>
  )
}

export default Content