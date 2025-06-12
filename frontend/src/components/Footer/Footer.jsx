import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black  border-t border-gray-300 px-6 py-18 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        {/* Columna 1 */}
        <div className="flex flex-col space-y-3 min-w-[160px]">
          <h3 className="font-semibold text-lg">Somos AutoMundo</h3>
          <a href="#" className="hover:underline">
            Sobre Nosotros
          </a>
          <a href="#" className="hover:underline">
            Ubícanos
          </a>
          <a href="#" className="hover:underline">
            Ayúdanos a mejorar
          </a>

          <div className="mt-4">
            <p className="font-semibold mb-1">Síguenos:</p>
            <div className="flex space-x-4 text-xl">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-gray-700"
              >
                <i className="fab fa-instagram"></i> {/* Si usas FontAwesome */}
                {/* O un SVG */}
                <svg
                  xmlns="bi bi-instagram"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01M7 12h.01M17 12h.01M12 7h.01M12 17h.01M12 12h.01"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h11.49v-9.294h-3.127v-3.622h3.127v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.098 2.797.142v3.24l-1.92.001c-1.505 0-1.797.717-1.797 1.765v2.31h3.588l-.467 3.622h-3.12v9.294h6.116c.732 0 1.324-.592 1.324-1.324v-21.35c0-.733-.592-1.325-1.324-1.325z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="flex flex-col space-y-3 min-w-[180px] text-gray-600">
          <h3 className="font-semibold text-lg text-black">
            Atención al Cliente
          </h3>
          <p className="text-black font-medium text-sm">+01 712 - 3333</p>
          <p className="text-sm">Lun. - Sáb. de 9:00am a 6:00pm</p>
          <a
            href="mailto:servicionalcliente@ser.com"
            className="text-sm hover:underline"
          >
            servicionalcliente@ser.com
          </a>
          <p className="mt-2 text-sm">Libro de Reclamaciones</p>

          <p className="mt-4 text-xs">RUC: 20378890121</p>
          <p className="text-xs">Razón social: AT. S.A.C.</p>
        </div>

        {/* Columna 3 */}
        <div className="flex flex-col space-y-3 min-w-[180px]">
          <h3 className="font-semibold text-lg">Servicios al Cliente</h3>
          <a href="#" className="hover:underline">
            Contacto
          </a>
          <a href="#" className="hover:underline">
            Cambios y devoluciones
          </a>
          <a href="#" className="hover:underline">
            Medios de pago
          </a>
          <a href="#" className="hover:underline">
            Compra Fácil y seguro
          </a>
          <a href="#" className="hover:underline">
            Términos y Condiciones
          </a>
        </div>

        {/* Columna 4 - métodos de pago */}
        <div className="bg-gray-800 text-white p-6 rounded-md min-w-[280px] max-w-xs">
          <h4 className="font-semibold mb-3">Métodos de pago</h4>
          <div className="flex flex-wrap gap-3 mb-4">
            {/* Aquí puedes colocar íconos o imágenes de métodos de pago */}
            <img
              src="/path-to-icons/mastercard.svg"
              alt="MasterCard"
              className="h-6"
            />
            <img src="/path-to-icons/visa.svg" alt="Visa" className="h-6" />
            <img src="/path-to-icons/yape.svg" alt="Yape" className="h-6" />
            <img
              src="/path-to-icons/diners.svg"
              alt="Diners Club"
              className="h-6"
            />
            <img
              src="/path-to-icons/american-express.svg"
              alt="American Express"
              className="h-6"
            />
            <img
              src="/path-to-icons/pago-efectivo.svg"
              alt="Pago Efectivo"
              className="h-6"
            />
            <img
              src="/path-to-icons/agora-pay.svg"
              alt="Agora Pay"
              className="h-6"
            />
            <img src="/path-to-icons/plin.svg" alt="Plin" className="h-6" />
            <img
              src="/path-to-icons/cuotealo.svg"
              alt="Cuotealo"
              className="h-6"
            />
          </div>

          <h4 className="font-semibold mb-2">
            Realiza tus compras de forma segura
          </h4>
          <p className="text-xs mb-3">Tecnología</p>
          <img src="/path-to-icons/vtex.svg" alt="VTEX" className="h-8 mb-3" />

          <div className="flex items-center gap-3 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c0-1.104-.448-2-1-2s-1 .896-1 2 1 3 1 3 1-1.896 1-3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12v5m0 0h-2m2 0h2m-6-5h8a2 2 0 012 2v3a2 2 0 01-2 2h-8a2 2 0 01-2-2v-3a2 2 0 012-2z"
              />
            </svg>
            <div>
              <p>SITIO SEGURO</p>
              <p>Ambiente Seguro</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
