import { JobPost } from "./interface";

// export const JobPosts : JobPost[] = [
//     {
//         id: 0,
//         image: "https://storage.googleapis.com/hust-files/images/vnglogobig_5.8k.png",
//         company: "VNG",
//         title: "Tuyển dev",
//         salary: "1 - 2tr",
//         destination: "Hà Nội",
//         author: "Trần Văn Bình",
//         content: "Tuyển dev"
//     },
//     {
//         id: 1,
//         image: "data:image/png;base64,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",
//         company: "VUS",
//         title: "Tuyển dev",
//         salary: "2 - 5tr",
//         destination: "Bình Dương",
//         author: "Trần Văn Bình",
//         content: "Tuyển intern"
//     }, {
//         id: 2,
//         image: "data:image/png;base64,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",
//         company: "Foxconn",
//         title: "Tuyển dev",
//         salary: "3 - 8tr",
//         destination: "Đà Nẵng",
//         author: "Trần Văn Bình",
//         content: "Tuyển manager"
//     }, {
//         id: 3,
//         image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYUAAACBCAMAAAAYG1bYAAABDlBMVEX////lLi10u0PjAAAAUJQAUpUATJIATpMAR5AXWJgASZHlKypQeKrkHx5yuj9qtzAARY/kJSTkExHjEA5tuDcAQo6LosLkIyLkGhlZfq364eFvuTr99PRltSfkHRzEz9/xoqL41dX2xcXZ4OqAmb2tvdPzsLDtf3/lMzL86uq7yNpoiLPw8/fui4r3z8/1vb2iz4frcnHR58W626eCwVnvlJT0+fHI4rrb7NHpYWDk8d6JxGScr8rmPDur1JPnS0ru9unpXFzsenryp6eTyHJ1kbjR2uYvY56v1pk/baO+3azqa2pXsAB7vk/nRkWUwGiWnTqglzyToz6Jq0B7rjRpw0SvhTnIXSi1fzj1iI+rRyJ/AAAMZElEQVR4nO2daWO6OhaHqRAQUBFwwQV37aLWWqt2sa3dtLa3nbvMnTvz/b/IJOwitqL+a7V5XiFCgPzMOSc5IRIEBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDGYnyRZLtUJz/759f9/s1krFw03f0I8jXWvzpCwp4WRSFMVkMqxIEqm8FoqbvrGfw3FTlHMivzeDmJOl+9Kmb+8nkO3yctJDAZOkJDXTm77JHee4TYY/kMAQgrxobfpGd5jiLSl+JoFumqRr3TAN+4+PJzedl9Pz4WZvfWfIthfUAMHLd4ZdOj9RhVhMEISrm9PeZp9gB6iRyYU10NoD2TVP7QixQCAQycTUq/4mH2HrObyVfGmAyB1YgWtHjQQQkZhwMtzgY2w3LR/GyIYnC2YBw7NYQCej3mzwQbaZLrmEBgjp1SrjUTBkCMQCw409yRbT9m+NTMK3Vik3lgwRYbi5h9lW3sNLiwCdtJg1yzmJWTKoww0+z1Zy6y82csPnLBmuIpYMZ5t8oi1kRRGgDHtmUT3VVCEg4JDVD+3ciiJAo3RtFvYcw41hGZrzHTOPhrSTotfgqovwhVmcpUJA3eRTbRmlOSGqqMjk3l17f3+/fXdAyspHo6wQuWmUd5PBKvgm6yUCH5aUds05ep2u7YflD8ZalYNj48jTGFbBN3ezPWZeCnePPQ4tdvckbx14e0CJuLT6DIGve4otpzbjFHjpYH7qoPQue+igvDuaTc9UIXPyBfe/E8zao7DycfqmxLsjKmdDIBwqxHCkuiDNsLtG9z89p0tONQflejr7OTRVEH7VTe8a7qaQ5BeZYZG+trUTyQfXt+eGChk8rrog7elOc+4u+/k5iAvFOEO6m5mi9GLESCrOui2Gqykor5+fYrAveTcEyKM+khR7XuON7iTmr/RhytEqbR9FoA63dOs1V88wSJE13Ocu0z81tw6cbja8eEtANGXJM5jq6wZJvVzxLneb4ZslQkl2iCDefnSWB01vH/KmGSThZZV73Hlufju3tptO3ywv6Jg/QY+QYo9rKWxHOc04RCD2HAaJXNPc0zPUFDJX6ylsJxmeCapDhENHhJT045k/oIO8QgYnFubTUSNT6a+W4mgK67FHWqYNizCf3pkQiE2NrzlGL8Ldeaf5A9mjGBZhLi9qxJ2CdIxpr6kpoBkYAh5JnUfvSpgdU7DdQvJ+LVfpwIuoOESdx2UmMzsn4tDuLUheOR3f9NVARDj//LgfSl+bx+ueEpG2VZDXcZVTFboEPII3jxPBc0zh2MqyJZveJ/oCSq0uNYBX7N5dX9TWcAffmquYd/6xZKnwSXZtITpqLLDM0FH2ggyLvChffH7oFtN7MyamCO46KlndBXn1VwVPBHWp2KhkTtdX1tEevyu9N2PeaOTN/ZWtArnyZa7UwFJuuWbHaWsKlr8jvYA5eTfWcX9nW6Tkile5XDY+LWgi6KNZOY+E0W7Qy1gzqGcMku2d+ffVrtL/bckR1AcoAq/Ioow68eLOeoY3S4RAbOZLK1Ll/WYWpnmMLJnQOSbRe3EoMmiiWwmvdBffl0drxmggMjvWbCWdV1LhMrPsrKNsjt8jDZ+MhrR21DF07KmKnvPklDWocDLjbhbmXXQkNaB1lHdymZNL+30ObxXaRpDI88te4nx5DYiCskfa/RR4L9JOquBwCtAieTjQgjmyvWSk2lvlPf80uSc5oqKW4lOFw0KtsJbRr19L32GPvLoLjlBVXmrxqd5KY0Z3YtI556Mo+ew7NmulWu37e5KMsyl4zpSz3LO0RM55xWG7kmy/CoeAAZsv71wsdltd4tsvS9OPTYngOYH6ll8207ZaO4CIPDllT9JkzpddzBZaRKH47RdpuppuCl6hquUY+OvZ734tNcnVScvWCv5+CqXCYa2wxjv6NagBF7OdZ+QhVxrOyydSk9DTkb1jNKinnqr6dmMSMhkQxMDcnmiHX/Nk2jwjlKo4iigPYJmJkfEJHp8yNsehiX5GIpUaNKBux99/KcVLwa2Cl3++EJc1SZA84BiKAoBmjDorT4IU3EEHtc9VDhhEYSWPAWA04mX4XUvSUxpVwFEMABTN5PUiGiGtCBAN6R/jLKudAK/GUZoe8BqwKLqxxA1/PeczKrgmYGi0jCiJz/m/Qj0KaJBKARpWlF7tcShIaBIEesU9sRrj8ZhtEI0oO65oPKFD33kS/ZAnHKDpUApwsAhNhjwsgk7VxzRLaTIcwcKBdgYxoBjYpAgWMOMQ/LqyVK18NR4qeM0dVfhl8zwTihnrNUdRDEsgESgW7WjUKXZiHMSyUX0jT4OEfW6aRF6hMQb0ZGQUQaEDoQiMZs9g7QdRWQkAdQxq50CtoLYJBpWTiAdTxDYwa5GQDDMZyYIxisH7HUqrM/STsdlIDBINohylzJqZsFHdYDSCph4JinbY/mZYhgHSBHAJRxFlosGBsWFp8hxApY1ZABubJgytqWFoks+Xfd7vhvBSISBcuSNM863+nD/PcBQE9ek9Y8CamyPaqPIjhjLqOWQKo5HjD6CJoZnEVAlEneKsg8YsRyA7xhC6knmaRTaKZpmqrxvdMPYb+E4y7m6D9aIt6SviYFElORkF7R97g9N/vkSFog2vy7FjIl+HoIovSSgagM5guohGXLP8OnUQRIYJtgi4VUZuQTNp0NrR48F2uGZEz7MxwOZwdjp1nPkiia8+Q3mmKQwYYG03gkblQ/uhV1iZg+70iaMoDpmx/aRchDVMuZrCwNEUoBugkVugBig4qmifkcoNFCIx8QGxLZzP9BiMiFV4ex7ah1l9htznr9haVGnGVRF1xvaXR7RufqBbMH7uVQbWYT2VSoWQPDlecrYTkycQtT8wyC9MAD0y2h1nmrQy1JuNHxHbQn+ODIFIRj3rWH24rplmkAv2ucPzy+EHRQ8oyqXCBISs7THQfTIMjAwPrgc4BmkZRUh1wLiqMgSC1naV4WD9R7UQawAlLHOs3dZSwCx3GzgXPH2DJkRMEK6e+5fIWb8neR2yBg3Z5Wnn5PnlkxxmVfeVDkLAchQDJqjXLwzxDVfKOd1ITUGJ/spMVdZtqRoUEnLE6VeJgtQRA+wewhG9TSoQxInqGlmdbhJoNeDA1b9+/wPx+59//fvv39THzgJZZNin5YxfcrleD420SjWqqRpkDJ9htYAy5xRtP4kyCUfQxph97npqUtVci3FUQ+8xDxi9xdUBmLDQpKExEfQ5QXFbFSgRveeI8IEQSAuNvyGBP//zz6JTs2Cswj3BCH8Ee9Car4S60HAHMUpxjNlns6xIlQYOA/bOa6/QTQAbrcAi8qgI5Kgb8HjUi2tU4I4RYboFrU1ofh5dAw1JwW7FemrnCzm/CahQCW8pYHtADeKvP/77z4EIjZJyt2CpY4oFXDBIA4bTnewgDndwcEfQjJ7KnBlIVYB2cDAYR+2F1HN7DQBYiotqRejtahRnWTrIwVAKaLUfNT0yGglBgkLhqCgaaNqeUNXB8PT5EUohCDEL+EFQhbfHk84pdA7/I3kjYBXDC6YRK3Eaxoyc1f2FloiG9cOxls8dRINGCxgzFKAQ6CdelI0Ma+MJFkExQdvRj1iOoRia1sscxZmxWTSgkaCNMVSIibuC5O2id3l+2n/R6PdPp4Mge2FhnmwvlvNqVBOJwci552h6RzVRMbztU8KE0PKsslXEIFGdGovIDxIDM4AdVSrmIHklkdD35hOJ6lY2hMUo2BNGRfJ+fj86+8F3i1FT1jAvdldpORY9SpIX3pno4zYprfpK7kNuKsPcUi72v38S/8soKo4F9ERJ2W9N/+qzJRhiwkPIFZO9hZxzzkua5OU1vV+6G2QvppbQSyok/9p9qLUgte7rASnpS3n6Xi/DBVQhbAXE6Rz/9Unvb86D6x8YeDGcUxC5sGNdW2m1t5+gX7DW3ChBM7iGV1h2jMNbrxUiXSyTHnWA5qIZEzCaMCQgv/2cog3QCiuf6uAzI+RCW30juVeo7Uth2LB8jOT+JGrzVq61Wc1Bv6Pi+XAOLQukrOd1912kdfvJX1WJi45zeFKwl4lbOezdaYpNSZq7uDmflFZqDPaSieQuv9e5Fo6be6Tk/j9VGDRJZHLVP1OtaR1EXllmkvLPI3tcaF+Tsixp0aoky+TBa7e0hnmJLUmW5GRh9YJ+Dtn0cQl23ErH6/yL7WIJ9xIwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBvPL+T8Y4SAud64PQAAAAABJRU5ErkJggg==",
//         company: "Coteccons",
//         title: "Tuyển dev",
//         salary: "5 - 7tr",
//         destination: "Tp. Hồ Chí Minh",
//         author: "Trần Văn Bình",
//         content: "Tuyển Dev-Ops"
//     }, {
//         id: 4,
//         image: "https://www.vinataba.com.vn/wp-content/uploads/2021/09/Vinataba2Icon-1.png",
//         company: "VNG",
//         title: "Tuyển dev",
//         salary: "10 - 20tr",
//         destination: "Hà Nội",
//         author: "Trần Văn Bình",
//         content: "Tuyển freelancer"
//     },  {
//         id: 6,
//         image: "https://banner2.cleanpng.com/20180901/gel/kisspng-logo-brand-robert-bosch-gmbh-audi-oxygen-sensor-accredited-installers-frank-street-1713945293162.webp",
//         salary: "9 - 10 tr",
//         destination: "Tp. Hồ Chí Minh",
//         company: "Bosch",
//         title: "Tuyển dev",
//         author: "Trần Văn Bình",
//         content: "Tuyển fresher"
//     },
// ]

export const InfoJob : JobPost[] = [
    {
      id: "1",
      urlLogo: "https://tinyurl.com/mwy9cv28",
      title: "Trưởng phòng kinh doanh",
      titleCompany: [
        "Quản lý điều hành, hoạt động bán hàng của phòng kinh doanh phụ trách",
        "Đào tạo, giám sát công việc, có trách nhiệm về hoạt động của tất cả khu vực trực thuộc bộ phận mình phụ trách",
        "Xây dựng kế hoạch, chiến lược bán hàng nhằm đảm bảo chỉ tiêu doanh thu được giao",
        "Hỗ trợ nhân viên chăm sóc, tư vấn và chốt deal",
        "Tìm kiếm khách hàng có nhu cầu ",
      ],
      nameCompany: "Công ty TNHH DEMO",
      request: [
        "Tối thiểu 6 tháng - 1 năm kinh nghiệm về quản lý mảng Bất động sản (Bắt buộc)",
        "Tốt nghiệp THPT trở lên",
        "Khả năng giao tiếp tốt và đàm phán, có khả năng tạo mối quan hệ khách hàng lâu dài.",
        "Kỹ năng tổ chức, quản lý thời gian và làm việc độc lập, làm việc theo đội nhóm.",
        "Đam mê kinh doanh, yêu thích môi trường làm việc Bất Động Sản",
        "Mong muốn phát triển đội ngũ bán hàng chuyên nghiệp, đam mê kinh doanh"
      ],
      salary: "15-20",
      location: [
        "Hà Nội"
      ],
      locationDetail: [
        "Hồ Chí Minh: TP.HCM, 51 Kinh Dương Vương, P12, Quận 6, Quận 6",
        " Long An: Long An, Huyện Tân Trụ, Tân Trụ"
      ],
      exp: "6 tháng - 1 năm",
      interest: [
        "Nhận hoa hồng trên giá trị sản phẩm bán được từ 30 triệu/sản phẩm",
        "Thưởng nóng từ 20 triệu/sản phẩm",
        "Được đào tạo bài bản, chuyên nghiệp các công tác hỗ trợ bán hàng",
        "Tham gia miễn phí 100% chương trình đào tạo cơ bản và nâng cao với nghề",
        "Chế độ Bảo hiểm xã hội, nghỉ phép 12 ngày/ năm, các chế độ khác tuân thủ đúng quy định của pháp luật"
      ],
      working_time: "Thời gian làm việc từ 8 giờ sáng đến 17 giờ chiều cùng ngày. Thứ 7 và chủ nhật công ty không hoạt động",
      start_date: '03-03-2024',
      end_date: '12-07-2024'
    },
    {
      id: "2",
      urlLogo: "https://thicao.com/wp-content/uploads/2019/08/logo-ban-le-stater-bros-markets.jpg",
      title: "Nhân viên tư vấn bán hàng",
      titleCompany: [
        "Tư vấn và giới thiệu sản phẩm đến khách hàng",
        "Chăm sóc khách hàng hiện có và phát triển khách hàng mới",
        "Lập kế hoạch bán hàng theo tuần và tháng",
        "Thực hiện các chiến dịch marketing để thúc đẩy doanh số",
        "Ghi nhận và báo cáo công việc hàng tuần cho quản lý"
      ],
      nameCompany: "Công ty Cổ phần ABC",
      request: [
        "Không yêu cầu kinh nghiệm, chấp nhận đào tạo từ đầu",
        "Tốt nghiệp Trung học phổ thông trở lên",
        "Kỹ năng giao tiếp tốt và tự tin, có khả năng làm việc nhóm",
        "Có tinh thần trách nhiệm và yêu thích công việc kinh doanh",
        "Thái độ tích cực và kiên nhẫn khi làm việc với khách hàng"
      ],
      salary: "8-12",
      location: [
        "Đà Nẵng"
      ],
      locationDetail: [
        "Đà Nẵng: 123 Nguyễn Văn Linh, Hải Châu",
        "Quảng Nam: TP Tam Kỳ, Nguyễn Du"
      ],
      exp: "Không yêu cầu kinh nghiệm",
      interest: [
        "Hoa hồng trên sản phẩm bán ra từ 5-10 triệu/sản phẩm",
        "Thưởng nóng theo tuần và tháng dựa trên doanh số",
        "Chế độ bảo hiểm đầy đủ, nghỉ phép 12 ngày/năm",
        "Hỗ trợ đồng phục và công cụ làm việc",
        "Đào tạo kỹ năng bán hàng và chăm sóc khách hàng"
      ],
      working_time: "Thời gian làm việc từ 8 giờ sáng đến 5 giờ chiều, nghỉ cuối tuần thứ 7 và Chủ Nhật",
      start_date: '14-05-2024',
      end_date: '22-10-2024'
    },
    {
      id: "3",
      urlLogo: "https://thicao.com/wp-content/uploads/2019/08/logo-ban-le-dermstore.jpg",
      title: "Quản lý dự án",
      titleCompany: [
        "Quản lý tiến độ và chất lượng dự án theo kế hoạch đã đề ra",
        "Lập kế hoạch và giám sát ngân sách dự án",
        "Hỗ trợ đội ngũ triển khai dự án đạt kết quả tốt nhất",
        "Chịu trách nhiệm báo cáo và cập nhật tình hình dự án cho ban lãnh đạo",
        "Xử lý các tình huống phát sinh trong quá trình triển khai"
      ],
      nameCompany: "Công ty TNHH XYZ",
      request: [
        "Tối thiểu 2 năm kinh nghiệm quản lý dự án",
        "Tốt nghiệp Đại học ngành Kinh tế, Kỹ thuật hoặc tương đương",
        "Kỹ năng lãnh đạo, lập kế hoạch và giải quyết vấn đề tốt",
        "Khả năng làm việc dưới áp lực và tinh thần trách nhiệm cao",
        "Có kinh nghiệm làm việc trong lĩnh vực xây dựng là lợi thế"
      ],
      salary: "20-25",
      location: [
        "Hà Nội", 
        "Hồ Chí Minh"
      ],
      locationDetail: [
        "Hà Nội: 45 Lê Văn Lương, Thanh Xuân",
        "Hồ Chí Minh: 112 Nguyễn Đình Chiểu, Quận 1"
      ],
      exp: "2 năm",
      interest: [
        "Thưởng dự án và các chế độ thưởng khác theo hiệu quả công việc",
        "Chế độ bảo hiểm đầy đủ, nghỉ phép 15 ngày/năm",
        "Được tham gia các chương trình đào tạo nâng cao chuyên môn",
        "Môi trường làm việc năng động và chuyên nghiệp",
        "Được hỗ trợ các thiết bị làm việc cần thiết"
      ],
      working_time: "Thời gian làm việc từ 8 giờ sáng đến 5 giờ chiều, nghỉ thứ 7 và Chủ Nhật",
      start_date: '01-02-2024',
      end_date: '15-01-2025'
    },
    {
      id: "4",
      urlLogo: "https://thicao.com/wp-content/uploads/2019/08/logo-cua-hang-ban-le-strandbags.jpg",
      title: "Nhân viên Digital Marketing",
      titleCompany: [
        "Xây dựng và thực hiện các chiến dịch marketing trực tuyến",
        "Quản lý các kênh truyền thông xã hội và nội dung website",
        "Tối ưu hóa quảng cáo Google Ads, Facebook Ads để đạt hiệu quả cao",
        "Theo dõi và báo cáo hiệu quả chiến dịch cho quản lý",
        "Nghiên cứu từ khóa và xây dựng kế hoạch SEO"
      ],
      nameCompany: "Công ty CP Tiếp thị Số 123",
      request: [
        "Tối thiểu 1 năm kinh nghiệm trong lĩnh vực Digital Marketing",
        "Tốt nghiệp Cao đẳng/Đại học ngành Marketing hoặc liên quan",
        "Kỹ năng phân tích dữ liệu và báo cáo, có kinh nghiệm về SEO",
        "Có khả năng làm việc độc lập và theo nhóm",
        "Sáng tạo, có tinh thần học hỏi và yêu thích Marketing"
      ],
      salary: "10-15",
      location: [
        "Hồ Chí Minh"
      ],
      locationDetail: [
        "Hồ Chí Minh: 90 Nguyễn Thái Bình, Quận Tân Bình",
        "Bình Dương: 56 Đại lộ Bình Dương, Thủ Dầu Một"
      ],
      exp: "1 năm",
      interest: [
        "Hoa hồng doanh số từ chiến dịch marketing thành công",
        "Thưởng nóng theo từng dự án đạt mục tiêu",
        "Được tham gia các khóa đào tạo nâng cao về Digital Marketing",
        "Chế độ bảo hiểm và nghỉ phép theo quy định của pháp luật",
        "Môi trường làm việc thân thiện, sáng tạo"
      ],
      working_time: "Làm việc từ 8 giờ sáng đến 5 giờ chiều, nghỉ thứ 7 và Chủ Nhật",
      start_date: '12-05-2024',
      end_date: '12-07-2024'
    },
    {
      id: "5",
      urlLogo: "https://thicao.com/wp-content/uploads/2019/08/logo-cua-hang-fao-schwarz.jpg",
      title: "Chuyên viên phân tích tài chính",
      titleCompany: [
        "Phân tích và đánh giá dữ liệu tài chính để đưa ra quyết định đầu tư",
        "Chuẩn bị báo cáo tài chính, dự đoán và phân tích xu hướng",
        "Đưa ra các khuyến nghị đầu tư dựa trên dữ liệu tài chính",
        "Hỗ trợ xây dựng chiến lược tài chính và kế hoạch đầu tư",
        "Đảm bảo tuân thủ các quy định pháp luật liên quan"
      ],
      nameCompany: "Công ty Tài chính ABC",
      request: [
        "Tối thiểu 1-2 năm kinh nghiệm trong lĩnh vực phân tích tài chính",
        "Tốt nghiệp Đại học ngành Tài chính, Kinh tế hoặc tương đương",
        "Kỹ năng phân tích, đánh giá và lập báo cáo tài chính xuất sắc",
        "Khả năng làm việc dưới áp lực cao và chi tiết",
        "Ưu tiên ứng viên có chứng chỉ CFA hoặc CPA"
      ],
      salary: "18-25",
      location: [
        "Hà Nội"
      ],
      locationDetail: [
        "Hà Nội: 12 Nguyễn Trãi, Thanh Xuân"
      ],
      exp: "1-2 năm",
      interest: [
        "Thưởng theo hiệu quả công việc và lợi nhuận đầu tư",
        "Chế độ bảo hiểm đầy đủ và nghỉ phép theo quy định",
        "Cơ hội phát triển và thăng tiến trong môi trường chuyên nghiệp",
        "Tham gia các khóa đào tạo chuyên sâu về phân tích tài chính",
        "Được hỗ trợ tài liệu và công cụ làm việc tiên tiến"
      ],
      working_time: "Làm việc từ 8 giờ sáng đến 5 giờ chiều, nghỉ thứ 7 và Chủ Nhật",
      start_date: '23-04-2024',
      end_date: '12-08-2024'
    },
    {
      id: "6",
      urlLogo: "https://thicao.com/wp-content/uploads/2019/08/logo-cua-hang-boots.jpg",
      title: "Trợ lý hành chính",
      titleCompany: [
        "Hỗ trợ các công việc hành chính, tổ chức hồ sơ và dữ liệu",
        "Phối hợp với các phòng ban để quản lý tài liệu và lịch trình",
        "Thực hiện các công tác hậu cần cho các sự kiện, hội nghị",
        "Theo dõi và cập nhật danh sách tài sản, vật tư của công ty",
        "Làm báo cáo công việc định kỳ cho quản lý"
      ],
      nameCompany: "Công ty Dịch vụ Văn phòng DEF",
      request: [
        "Không yêu cầu kinh nghiệm, sẵn sàng đào tạo",
        "Tốt nghiệp Trung cấp trở lên ngành Quản trị Kinh doanh hoặc liên quan",
        "Kỹ năng tổ chức, quản lý thời gian và chi tiết tốt",
        "Khả năng giao tiếp, làm việc độc lập và theo nhóm",
        "Thành thạo tin học văn phòng (Word, Excel, PowerPoint)"
      ],
      salary: "7-10",
      location: [
        "Hồ Chí Minh"
      ],
      locationDetail: [
        "Hồ Chí Minh: 88 Võ Văn Kiệt, Quận 1"
      ],
      exp: "Không yêu cầu kinh nghiệm",
      interest: [
        "Chế độ bảo hiểm xã hội, y tế theo quy định",
        "Được tham gia các hoạt động teambuilding, du lịch hàng năm",
        "Được đào tạo kỹ năng hành chính và quản lý hồ sơ",
        "Nghỉ phép 12 ngày/năm, chế độ tăng lương định kỳ",
        "Môi trường làm việc ổn định và thân thiện"
      ],
      working_time: "Làm việc từ 8 giờ sáng đến 5 giờ chiều, nghỉ cuối tuần thứ 7 và Chủ Nhật",
      start_date: '03-05-2024',
      end_date: '01-09-2024'
    }
  ]