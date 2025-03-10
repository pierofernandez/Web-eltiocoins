import { FaClock } from "react-icons/fa6";

export const Refundpolicy = () => {
    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', maxWidth: '1200px', width: '100%' }}>
                <h1 style={{ fontSize: '30px', color: '#646464', marginTop: '20px', marginBottom: '10px', fontWeight: 'bold' }}>Política de reembolso</h1>
                <h1 style={{ fontSize: '12px', color: '#333', marginBottom: '20px', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaClock style={{ color: '#d9534f' }} />
                    Última modificación: 2025-03-08
                </h1>

                <section style={{ marginTop: '30px' }}>
                    <h2 style={{ fontSize: '20px', color: '#d9534f', marginTop: '20px', marginBottom: '10px', fontWeight: 'bold' }}>I. Solicitar reembolso</h2>
                    <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.6', fontWeight: '500' }}>
                    eltiocoins permite a los compradores solicitar reembolsos por productos en condiciones razonables. <br />
                    Emitiremos reembolsos en las siguientes condiciones: <br /> <br />
                    1. Productos no recibidos: Los productos no se entregaron completamente a los compradores dentro del tiempo de entrega programado. En este caso, los compradores pueden solicitar un reembolso. <br />
                    2. Pago repetido: Los compradores realizaron pagos repetidos a un pedido. En este caso, podemos respetar la voluntad del comprador de dar un reembolso. Reembolsaremos uno de los pagos, o pagos múltiples (la premisa es que el pedido no se entrega). <br />
                    3. A veces necesitamos su ayuda para verificar la información de pago. Si lo rechaza o no responde a nuestra solicitud dentro de los 7 días, su pedido será cancelado y reembolsado inmediatamente. Para algunos pedidos, si no completa la verificación dentro de los 2 días, su pedido será cancelado y reembolsado inmediatamente. <br />
                    4. Cuando el monto de su pago sea menor que el monto del pedido, tendrá la oportunidad de compensar el saldo. Si lo rechaza o no responde dentro de los 7 días, su pedido será cancelado y reembolsado inmediatamente. <br />
                    5. El producto recibido por el comprador no coincide con la descripción del mismo. <br />
                    6. Debido a la naturaleza de los bienes virtuales, los compradores no necesitan pagar ningún costo de envío para obtener reembolsos. <br /> <br />
                    En los siguientes casos, no podremos reembolsar a los compradores: <br />
                    1. Entrega completada: los productos se han entregado al comprador según lo acordado y el comprador ha verificado y confirmado la recepción del pedido. <br />
                    2. Transacciones realizadas fuera de eltiocoins. <br />
                    3. No se emitirán reembolsos debido a la insatisfacción del comprador con el producto, artículos comprados por error y nunca informar el problema al equipo de soporte de eltiocoins dentro de las 72 horas y en el escenario de que la computadora del comprador no cumpla con los requisitos mínimos del Producto. <br />
                    4. Al comprar cualquier producto en eltiocoins, el comprador comprende, reconoce y acepta esta exención de responsabilidad. <br />
                    5. eltiocoins no cubre reclamos fraudulentos. Nos reservamos el derecho de tomar acciones legales y suspender permanentemente la cuenta de un comprador por presentar reclamos fraudulentos. <br />
                    6. Pedido no pagado: el comprador no puede solicitar un reembolso por el pedido no pagado. <br />
                    7. Por cualquier motivo que no sean los motivos enumerados anteriormente en "Emitiremos el reembolso bajo las siguientes condiciones". Los compradores solo deben confirmar la recepción del pedido después de verificar que el producto recibido es como se describe en la oferta y está en condiciones de funcionamiento. La confirmación de la recepción del pedido indica que el comprador está satisfecho con la compra y finaliza la transacción. Se considerará que el comprador ha aceptado los Bienes y/o Servicios adquiridos si el Comprador correspondiente no presenta ni presenta ninguna reclamación, problema o queja a eltiocoins dentro de las setenta y dos (72) horas posteriores a la entrega de los Bienes y/o Servicios adquiridos. No se otorgarán reembolsos por pedidos que se finalicen y completen. <br /> <br />
                    En caso de desacuerdo, el comprador debe proporcionar información relevante (como registros de chat, capturas de pantalla de pedidos, etc.) al equipo de atención al cliente dentro de las 72 horas. <br /> <br />
                    Si el comprador no proporciona evidencia relevante dentro del límite de tiempo, se considerará que renuncia automáticamente a la oportunidad de resolver la disputa. <br /> <br />

                    </p>
                    <p style={{ fontSize: '16px', color: 'black', lineHeight: '1.6', fontWeight: 'bold' }}>
                    Política de cancelación de pedidos
                    </p>
                    <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.6', fontWeight: '500' }}>
                    Debido a la naturaleza de nuestros productos/servicios, todas las compras son finales y no se aceptan cancelaciones una vez que el pedido ha sido realizado. Al completar una compra, el comprador reconoce y acepta que no habrá reembolsos ni modificaciones en el pedido. <br /> <br />
                    En cuanto al reembolso, por favor contacta con nuestro servicio de atención al cliente en línea 24/7 bajo condiciones razonables. Tu solicitud de reembolso será verificada después de que envíes el número de pedido y el motivo del reembolso. Si la solicitud es aprobada, el reembolso será devuelto a la cuenta o tarjeta bancaria del comprador. <br /> <br />
                    Tiempo de procesamiento del reembolso: Procesaremos la solicitud de reembolso en 5 días hábiles, pero el tiempo exacto del reembolso está determinado por la velocidad de procesamiento de los diferentes bancos.
                    </p>
                </section>

            </div>
        </div>
    );
};

export default Refundpolicy;