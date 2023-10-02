import { useState } from "react";

export const ConditionalApp = () => {
  const [conditionState, setConditionState] = useState(true);
  const [conditionState2, setConditionState2] = useState(1);

  const handleToggleCondition = () => {
    setConditionState(!conditionState);
    setConditionState2(conditionState2 === 1 ? 0 : 1);
  };

  return (
    <div>
      <h1>Condition: {JSON.stringify(conditionState)}</h1>
      {/* <h1>Condition: {conditionState.toString()}</h1> */}

      {/* FORMA 1 */}
      {conditionState ? (
        <h3>Message in TRUE: Form 1</h3>
      ) : (
        <h3>Message in FALSE: Form 1</h3>
      )}

      {/* FORMA 2 */}
      {conditionState ? <h3>Message in TRUE: Form 2</h3> : null}

      {/* FORMA 3 */}
      {/* tener cuidado porque en este caso como es solo true y false no hay problemas, pero en algunos casos si es un objeto o si es un string, número, etc, realizarlo de esta forma pintará un "0" en la pantalla, para eso se puede hacer la doble negación o sino convertirlo a boolean como en el caso del conditionState2 */}
      {conditionState && <h3>Message in TRUE: Form 3</h3>}

      {/* FORMA 3.1 */}
      {!!conditionState2 && <h3>Message in TRUE: Form 3.1</h3>}

      {/* FORMA 3.2 */}
      {Boolean(conditionState2) && <h3>Message in TRUE: Form 3.2</h3>}

      <button onClick={handleToggleCondition}>Toggle Condition</button>
    </div>
  );
};
