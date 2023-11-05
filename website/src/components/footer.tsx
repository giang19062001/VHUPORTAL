import '../style/footer.css';
export const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer_box">
          <div className="footer__info">
          <img
            className="navbar-logo"
            id="navbar-logo"
            alt=""
            src={require('../images/logo-Van-Hien.png')}
          />
            <table>
              <tr>
                <th>Trụ sở chính</th>
                <td>613 Âu Cơ, Phường Phú Trung, Quận Tân Phú, TP.HCM</td>
              </tr>
              <tr>
                <th>Các cơ sở đào tạo:</th>
                <td></td>
              </tr>
              <tr>
                <th>Harmony Campus</th>
                <td>624 Âu Cơ, Phường 10, Quận Tân Bình, TP. HCM</td>
              </tr>
              <tr>
                <th>HungHau Campus</th>
                <td>
                  Khu chức năng 13E- Nguyễn Văn Linh, Phong Phú, Nam Thành phố,
                  TP. HCM
                </td>
              </tr>
              <tr>
                <th>Heart Campus</th>
                <td>
                  736 - 738 - 740 Điện Biên Phủ, Phường 10, Quận 10, TP. HCM
                </td>
              </tr>
              <tr>
                <th>myU Campus</th>
                <td>
                  665 - 667 - 669 Điện Biên Phủ, Phường 1, Quận 3, TP. HCM
                </td>
              </tr>
              <tr>
                <th>Cơ sở</th>
                <td>642 Âu Cơ, Phường 10, Quận Tân Bình, TP. HCM</td>
              </tr>
            </table>
          </div>
          <div
            data-id="d52aa4a"
            data-element_type="widget"
            data-widget_type="google_maps.default"
          >
            <iframe
              width="150%"
              height="100%"
              loading="lazy"
              src="https://maps.google.com/maps?q=%C4%90%E1%BA%A1i%20h%E1%BB%8Dc%20V%C4%83n%20Hi%E1%BA%BFn&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near"
              title="Đại học Văn Hiến"
              aria-label="Đại học Văn Hiến"
            ></iframe>
          </div>
        </div>
        <div className="footerCopyright">
          <p>
            Copyright 2023 ©
            <b>
              <a className="footerCopyright__a" href="https://vhu.edu.vn/">
                Đại học Văn Hiến
              </a>
            </b>
          </p>
        </div>
      </footer>
    </div>
  );
};
