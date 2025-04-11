import { useState } from 'react'

export default function CreateBienBanForm() {
  const [loaiBienBan, setLoaiBienBan] = useState('')
  const [ngayBienBan, setNgayBienBan] = useState('')
  const [nguoiNhan, setNguoiNhan] = useState('')
  const [nguoiThucHien, setNguoiThucHien] = useState('')
  const [ghiChu, setGhiChu] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const bienBan = {
      loaiBienBan,
      ngayBienBan,
      nguoiNhan,
      nguoiThucHien,
      ghiChu,
    }
    console.log('Tạo biên bản:', bienBan)
    // TODO: Gửi dữ liệu lên backend
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">Tạo Biên Bản</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Loại biên bản</label>
            <select
              value={loaiBienBan}
              onChange={(e) => setLoaiBienBan(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">-- Chọn loại biên bản --</option>
              <option value="BBBG">Biên bản bàn giao</option>
              <option value="BBTH">Biên bản thu hồi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ngày biên bản</label>
            <input
              type="date"
              value={ngayBienBan}
              onChange={(e) => setNgayBienBan(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Người nhận</label>
            <select
              value={nguoiNhan}
              onChange={(e) => setNguoiNhan(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">-- Chọn người nhận --</option>
              <option value="nv001">Nguyễn Văn A</option>
              <option value="nv002">Trần Thị B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Người thực hiện</label>
            <select
              value={nguoiThucHien}
              onChange={(e) => setNguoiThucHien(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">-- Chọn người thực hiện --</option>
              <option value="nv001">Nguyễn Văn A</option>
              <option value="nv002">Trần Thị B</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ghi chú</label>
          <textarea
            value={ghiChu}
            onChange={(e) => setGhiChu(e.target.value)}
            placeholder="Nhập ghi chú nếu có..."
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Tạo biên bản
          </button>
        </div>
      </form>
    </div>
  )
}
