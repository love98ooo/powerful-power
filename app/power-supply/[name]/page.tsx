import { notFound } from 'next/navigation'
import { generatePowerSupplyId } from '@/lib/utils'
import powerSuppliesData from '@/public/data/power-supplies/power-supplies.json'
import EfficiencyChart from '@/components/power-supply/efficiency-chart'

// 生成静态参数用于SSG
export async function generateStaticParams() {
  return powerSuppliesData.map((powerSupply) => ({
    name: generatePowerSupplyId(powerSupply.model_name),
  }))
}

// 生成元数据
export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const decodedName = decodeURIComponent(name)
  const powerSupply = powerSuppliesData.find(
    (ps) => generatePowerSupplyId(ps.model_name) === name || generatePowerSupplyId(ps.model_name) === decodedName
  )

  if (!powerSupply) {
    return {
      title: '电源未找到',
    }
  }

  return {
    title: `${powerSupply.model_name} - ${powerSupply.wattage}W 电源详情`,
    description: `${powerSupply.model_name} 详细规格信息 - ${powerSupply.wattage}W ${powerSupply.form_factor} 电源，${powerSupply.eighty_plus_certification} 认证`,
  }
}

interface PageProps {
  params: Promise<{
    name: string
  }>
}

export default async function PowerSupplyPage({ params }: PageProps) {
  const { name } = await params
  const decodedName = decodeURIComponent(name)
  const powerSupply = powerSuppliesData.find(
    (ps) => generatePowerSupplyId(ps.model_name) === name || generatePowerSupplyId(ps.model_name) === decodedName
  )

  if (!powerSupply) {
    notFound()
  }

  const chartData = powerSupply.efficiency_points.map((dataPoint) => ({
    load: dataPoint.load_percentage,
    efficiency: dataPoint.efficiency_percentage,
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{powerSupply.model_name}</h1>
          <p className="text-muted-foreground">
            {powerSupply.wattage}W {powerSupply.form_factor} 电源详细规格
          </p>
        </div>

        <div className="grid gap-6">
          {/* 详细规格信息 */}
          <div className="bg-card rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">详细规格</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">基本信息</h3>
                <dl className="space-y-1 text-sm">
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                    <dt>型号:</dt>
                    <dd className="text-right">{powerSupply.model_name}</dd>
                  </div>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                    <dt>功率:</dt>
                    <dd className="text-right">{powerSupply.wattage}W</dd>
                  </div>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                    <dt>尺寸规格:</dt>
                    <dd className="text-right">{powerSupply.form_factor}</dd>
                  </div>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                    <dt>模组化:</dt>
                    <dd className="text-right">{powerSupply.modularity}</dd>
                  </div>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                    <dt>OEM:</dt>
                    <dd className="text-right">{powerSupply.oem}</dd>
                  </div>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                    <dt>拓扑:</dt>
                    <dd className="text-right">{powerSupply.topology}</dd>
                  </div>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                    <dt>80Plus认证:</dt>
                    <dd className="text-right">{powerSupply.eighty_plus_certification}</dd>
                  </div>
                </dl>
              </div>


              <div>
                <h3 className="font-medium mb-2">性能指标</h3>
                <dl className="space-y-1 text-sm">
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                    <dt>峰值效率:</dt>
                    <dd className="text-right">{powerSupply.peak_efficiency.peak_efficiency_percent}%</dd>
                  </div>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                    <dt>交叉负载测试:</dt>
                    <dd className="text-right">{powerSupply.cross_load_pass ? '通过' : '未通过'}</dd>
                  </div>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                    <dt>风扇尺寸:</dt>
                    <dd className="text-right">{powerSupply.fan_size_mm}mm</dd>
                  </div>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                    <dt>风扇轴承:</dt>
                    <dd className="text-right">{powerSupply.fan_bearing_type}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* 铭牌数据 */}
          <div className="bg-card rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">铭牌数据</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted">
                    <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">12V电流</th>
                    <td className="px-4 py-2 text-right text-sm">{powerSupply.nameplate_data['12v_current_a']}A</td>
                  </tr>
                  <tr className="hover:bg-muted">
                    <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">5V电流</th>
                    <td className="px-4 py-2 text-right text-sm">{powerSupply.nameplate_data['5v_current_a']}A</td>
                  </tr>
                  <tr className="hover:bg-muted">
                    <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">3.3V电流</th>
                    <td className="px-4 py-2 text-right text-sm">{powerSupply.nameplate_data['3_3v_current_a']}A</td>
                  </tr>
                  <tr className="hover:bg-muted">
                    <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">旁路功率</th>
                    <td className="px-4 py-2 text-right text-sm">{powerSupply.nameplate_data['side_power_w']}W</td>
                  </tr>
                  <tr className="hover:bg-muted">
                    <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">输入电压范围</th>
                    <td className="px-4 py-2 text-right text-sm">{powerSupply.input_voltage_range}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 能效曲线 */}
          <div className="bg-card rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">能效曲线</h2>
            <EfficiencyChart data={chartData} />
          </div>

          {/* 保护功能 */}
          <div className="bg-card rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">保护功能</h2>
            <dl className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                <dt>OPP触发功率:</dt>
                <dd className="text-right">{powerSupply.protection_features.opp_trigger_w}W</dd>
              </div>
              <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                <dt>OCP状态:</dt>
                <dd className="text-right">{powerSupply.protection_features.ocp_status}</dd>
              </div>
              <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                <dt>浪涌保护组件:</dt>
                <dd className="text-right">{powerSupply.protection_features.inrush_protection_components}</dd>
              </div>
            </dl>
          </div>

          {/* 购买信息 */}
          <div className="bg-card rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">购买信息</h2>
            <dl className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                <dt>获取状态:</dt>
                <dd className="text-right">{powerSupply.acquisition_status === 'New' ? '全新' : '二手'}</dd>
              </div>
              <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                <dt>购买价格:</dt>
                <dd className="text-right">¥{powerSupply.acquisition_price_rmb}</dd>
              </div>
              <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                <dt>保修年限:</dt>
                <dd className="text-right">{powerSupply.warranty_years}年</dd>
              </div>
              <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                <dt>保修政策:</dt>
                <dd className="text-right">{powerSupply.warranty_policy}</dd>
              </div>
              <div className="grid grid-cols-[max-content_1fr] gap-x-4">
                <dt>包装质量:</dt>
                <dd className="text-right">{powerSupply.packaging_quality}</dd>
              </div>
            </dl>
          </div>

          {/* 备注 */}
          {powerSupply.notes && (
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4">备注</h2>
              <p className="text-sm text-muted-foreground">{powerSupply.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
