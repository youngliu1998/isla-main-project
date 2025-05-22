import Accordion from 'react-bootstrap/Accordion'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function ProductInfoAccordion({ ingredients }) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>產品成分</Accordion.Header>
        <Accordion.Body className="text-wrap">
          {ingredients.map((ing, idx) => {
            const isLast = idx === ingredients.length - 1
            const displayText = ing.name + (isLast ? '' : ', ')

            if (ing.is_sensitive) {
              return (
                <OverlayTrigger
                  key={ing.ingredient_id}
                  placement="top"
                  overlay={
                    <Tooltip>
                      ⚠ {ing.warning_message || '本成分可能引起敏感反應'}
                    </Tooltip>
                  }
                >
                  <span
                    className="text-danger fw-semibold"
                    style={{ cursor: 'help' }}
                  >
                    {displayText}
                  </span>
                </OverlayTrigger>
              )
            }

            return (
              <span key={ing.ingredient_id} className="text-body">
                {displayText}
              </span>
            )
          })}
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>使用方式</Accordion.Header>
        <Accordion.Body>請依照包裝或醫師指示使用本產品。</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default ProductInfoAccordion
