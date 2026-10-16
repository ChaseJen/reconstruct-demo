import React, { useEffect, useState } from "react";
import {
  AppstoreFilled,
  CalendarOutlined,
  ClearOutlined,
  CloseOutlined,
  CompassFilled,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  MenuFoldOutlined,
  OrderedListOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";

const isStandalone = window.location.protocol === "file:" || Boolean(document.querySelector('script[src*="standalone-assets"]'));
const assetPrefix = isStandalone ? "./public" : "";
const asset = (name) => `${assetPrefix}/assets/${name}`;

const planStatusOptions = ["创建中", "创建失败", "待启动", "进行中", "已暂停", "已关闭"];
const taskStatusOptions = ["待启动", "进行中", "已暂停", "已关闭"];

const assetRegistry = [
  { assetId: "120827411601", name: "自然流量分销版", seriesId: "8274116", seriesName: "神经侦探", kind: "分账", status: "已生效" },
  { assetId: "120827411602", name: "达人专享分账版", seriesId: "8274116", seriesName: "神经侦探", kind: "分账", status: "待生效" },
  { assetId: "120827410901", name: "PA前分销版", seriesId: "8274109", seriesName: "都市无极医仙", kind: "分账", status: "已失效" },
  { assetId: "120827410902", name: "PA后分销版", seriesId: "8274109", seriesName: "都市无极医仙", kind: "分账", status: "已生效" },
  { assetId: "120827420801", name: "自然流量分销版", seriesId: "8274208", seriesName: "隐婚武学高手", kind: "分账", status: "已生效" },
  { assetId: "120827499901", name: "自然流量分销版", seriesId: "8274999", seriesName: "霜夜照归人", kind: "分账", status: "已生效" },
  { assetId: "120827430101", name: "分销版", seriesId: "8274301", seriesName: "还没来得及说爱你", kind: "分账", status: "已生效" },
  { assetId: "120827430201", name: "分销版", seriesId: "8274302", seriesName: "我的死对头是恋爱脑", kind: "分账", status: "已生效" },
  { assetId: "120827440101", name: "投流获客版", seriesId: "8274401", seriesName: "山河故人归", kind: "投流", status: "已生效" },
];

const isEffectiveShareAsset = (assetItem) => assetItem.kind === "分账" && assetItem.status === "已生效";
const assetById = Object.fromEntries(assetRegistry.map((assetItem) => [assetItem.assetId, assetItem]));
const effectiveShareAssets = assetRegistry.filter(isEffectiveShareAsset);
const seriesOptions = [...new Map(effectiveShareAssets.map((assetItem) => [assetItem.seriesId, { seriesId: assetItem.seriesId, seriesName: assetItem.seriesName }])).values()];
const seriesById = Object.fromEntries(seriesOptions.map((series) => [series.seriesId, series]));
const effectiveAssetBySeries = Object.fromEntries(effectiveShareAssets.map((assetItem) => [assetItem.seriesId, assetItem]));

function planBindings(plan) {
  const unique = new Map();
  plan.assetIds.forEach((assetId) => {
    const assetItem = assetById[assetId];
    if (assetItem && !unique.has(assetItem.seriesId)) unique.set(assetItem.seriesId, assetItem);
  });
  return [...unique.values()];
}

const initialPlans = [
  {
    id: 3096,
    name: "招募达人8.13-iaa",
    status: "进行中",
    assetIds: ["120827411601", "120827410902"],
    materials: [
      { seriesId: "8274116", seriesName: "神经侦探", link: "https://pan.baidu.com/s/1uKuoNR4N-V3cbnXsR6BCmg?pwd=8888" },
      { seriesId: "8274109", seriesName: "都市无极医仙", link: "https://pan.baidu.com/s/demo?pwd=8888" },
    ],
    mode: "招募达人",
    share: "版权商: 18.0%｜达人机构: 70.0%",
    modifier: "系统",
    modifiedAt: "2026-08-14 14:00:02",
    createdAt: "2026-08-13 20:21:34",
    startAt: "2026-08-13 20:15:49",
    endAt: "2027-08-22 20:15:52",
  },
  {
    id: 3095,
    name: "右豹、抖推猫、王牌、好省8.13-iaa",
    status: "进行中",
    assetIds: ["120827411601", "120827420801", "120827499901"],
    materials: [
      { seriesId: "8274116", seriesName: "神经侦探", link: "https://pan.baidu.com/s/1uKuoNR4N-V3cbnXsR6BCmg?pwd=8888" },
      { seriesId: "8274208", seriesName: "隐婚武学高手", link: "https://pan.baidu.com/s/demo?pwd=8888" },
      { seriesId: "8274999", seriesName: "霜夜照归人", link: "https://pan.baidu.com/s/demo-shuangye?pwd=8888" },
    ],
    mode: "指定服务商",
    share: "版权商: 18.0%｜达人机构: 80.0%",
    modifier: "wb_wangwenqi",
    modifiedAt: "2026-08-13 20:22:09",
    createdAt: "2026-08-13 20:21:02",
    startAt: "2026-08-13 20:18:24",
    endAt: "2027-08-15 20:18:26",
  },
  {
    id: 3094,
    name: "秋季新剧预热计划",
    status: "待启动",
    assetIds: ["120827430101", "120827430201"],
    materials: [
      { seriesId: "8274301", seriesName: "还没来得及说爱你", link: "https://pan.baidu.com/s/demo?pwd=8888" },
      { seriesId: "8274302", seriesName: "我的死对头是恋爱脑", link: "https://pan.baidu.com/s/demo?pwd=8888" },
    ],
    mode: "招募达人",
    share: "版权商: 18.0%｜达人机构: 70.0%",
    modifier: "chenyu",
    modifiedAt: "2026-08-11 09:16:05",
    createdAt: "2026-08-11 09:10:30",
    startAt: "2026-09-01 00:00:00",
    endAt: "2027-09-01 00:00:00",
  },
];

const initialTasks = [
  {
    id: 908796,
    name: "招募达人8.13-iaa",
    status: "进行中",
    pauseReason: "—",
    canRestart: false,
    planId: 3096,
    planName: "招募达人8.13-iaa",
    seriesId: "8274116",
    seriesName: "神经侦探",
    assetId: "120827411601",
    seriesStatus: "已上架",
    relation: "—",
    relatedTaskId: null,
    source: "手动创建",
    sourceId: "3096",
    mode: "招募达人",
    share: "版权商: 18.0%｜分销商: 70.0%",
    startAt: "2026-08-13 20:15:49",
    endAt: "2027-08-22 20:15:52",
    modifiedAt: "2026-08-13 20:22:12",
    modifier: "—",
    isComic: false,
    ruleId: "—",
  },
  {
    id: 908805,
    name: "招募达人8.13-iaa",
    status: "进行中",
    pauseReason: "—",
    canRestart: false,
    planId: 3096,
    planName: "招募达人8.13-iaa",
    seriesId: "8274109",
    seriesName: "都市无极医仙",
    assetId: "120827410902",
    seriesStatus: "已上架",
    relation: "转换自",
    relatedTaskId: 908798,
    source: "手动创建",
    sourceId: "3096",
    mode: "招募达人",
    share: "版权商: 18.0%｜分销商: 70.0%",
    startAt: "2026-08-13 20:15:49",
    endAt: "2027-08-22 20:15:52",
    modifiedAt: "2026-08-14 14:00:02",
    modifier: "系统",
    isComic: false,
    ruleId: "—",
  },
  {
    id: 908798,
    name: "招募达人8.13-iaa",
    status: "已暂停",
    pauseReason: "PA转换",
    canRestart: false,
    planId: 3096,
    planName: "招募达人8.13-iaa",
    seriesId: "8274109",
    seriesName: "都市无极医仙",
    assetId: "120827410901",
    seriesStatus: "已上架",
    relation: "转换为",
    relatedTaskId: 908805,
    source: "手动创建",
    sourceId: "3096",
    mode: "招募达人",
    share: "版权商: 18.0%｜分销商: 70.0%",
    startAt: "2026-08-13 20:15:49",
    endAt: "2027-08-22 20:15:52",
    modifiedAt: "2026-08-14 14:00:02",
    modifier: "系统",
    isComic: false,
    ruleId: "—",
  },
  {
    id: 908799,
    name: "版权商素材任务-霜夜照归人",
    status: "进行中",
    pauseReason: "—",
    canRestart: false,
    planId: null,
    planName: "—",
    seriesId: "8274999",
    seriesName: "霜夜照归人",
    assetId: "120827499901",
    seriesStatus: "已上架",
    relation: "—",
    relatedTaskId: null,
    source: "自动创建",
    sourceId: "2871",
    mode: "—",
    share: "版权商: 94.0%｜分销商: 0.0%",
    startAt: "2026-07-27 22:58:34",
    endAt: "2099-01-01 00:00:00",
    modifiedAt: "2026-08-13 20:48:56",
    modifier: "—",
    isComic: true,
    ruleId: "2871",
  },
  {
    id: 908800,
    name: "右豹、抖推猫、王牌、好省8.13-iaa",
    status: "已暂停",
    pauseReason: "短剧下架",
    canRestart: false,
    planId: 3095,
    planName: "右豹、抖推猫、王牌、好省8.13-iaa",
    seriesId: "8274208",
    seriesName: "隐婚武学高手",
    assetId: "120827420801",
    seriesStatus: "已下架",
    relation: "—",
    relatedTaskId: null,
    source: "手动创建",
    sourceId: "3095",
    mode: "指定服务商",
    share: "版权商: 18.0%｜分销商: 80.0%",
    startAt: "2026-08-13 20:18:24",
    endAt: "2027-08-15 20:18:26",
    modifiedAt: "2026-08-13 21:36:18",
    modifier: "系统",
    isComic: false,
    ruleId: "—",
  },
  {
    id: 908801,
    name: "秋季新剧预热计划",
    status: "待启动",
    pauseReason: "—",
    canRestart: false,
    planId: 3094,
    planName: "秋季新剧预热计划",
    seriesId: "8274301",
    seriesName: "还没来得及说爱你",
    assetId: "120827430101",
    seriesStatus: "已上架",
    relation: "—",
    relatedTaskId: null,
    source: "手动创建",
    sourceId: "3094",
    mode: "招募达人",
    share: "版权商: 18.0%｜分销商: 70.0%",
    startAt: "2026-09-01 00:00:00",
    endAt: "2027-09-01 00:00:00",
    modifiedAt: "2026-08-11 09:16:05",
    modifier: "chenyu",
    isComic: false,
    ruleId: "—",
  },
  {
    id: 908802,
    name: "秋季新剧预热计划",
    status: "待启动",
    pauseReason: "—",
    canRestart: false,
    planId: 3094,
    planName: "秋季新剧预热计划",
    seriesId: "8274302",
    seriesName: "我的死对头是恋爱脑",
    assetId: "120827430201",
    seriesStatus: "已上架",
    relation: "—",
    relatedTaskId: null,
    source: "手动创建",
    sourceId: "3094",
    mode: "招募达人",
    share: "版权商: 18.0%｜分销商: 70.0%",
    startAt: "2026-09-01 00:00:00",
    endAt: "2027-09-01 00:00:00",
    modifiedAt: "2026-08-11 09:16:05",
    modifier: "chenyu",
    isComic: false,
    ruleId: "—",
  },
  {
    id: 908803,
    name: "右豹、抖推猫、王牌、好省8.13-iaa",
    status: "进行中",
    pauseReason: "—",
    canRestart: false,
    planId: 3095,
    planName: "右豹、抖推猫、王牌、好省8.13-iaa",
    seriesId: "8274116",
    seriesName: "神经侦探",
    assetId: "120827411601",
    seriesStatus: "已上架",
    relation: "—",
    relatedTaskId: null,
    source: "手动创建",
    sourceId: "3095",
    mode: "指定服务商",
    share: "版权商: 18.0%｜分销商: 80.0%",
    startAt: "2026-08-13 20:18:24",
    endAt: "2027-08-15 20:18:26",
    modifiedAt: "2026-08-13 20:22:09",
    modifier: "wb_wangwenqi",
    isComic: false,
    ruleId: "—",
  },
  {
    id: 908804,
    name: "右豹、抖推猫、王牌、好省8.13-iaa",
    status: "进行中",
    pauseReason: "—",
    canRestart: false,
    planId: 3095,
    planName: "右豹、抖推猫、王牌、好省8.13-iaa",
    seriesId: "8274999",
    seriesName: "霜夜照归人",
    assetId: "120827499901",
    seriesStatus: "已上架",
    relation: "—",
    relatedTaskId: null,
    source: "手动创建",
    sourceId: "3095",
    mode: "指定服务商",
    share: "版权商: 18.0%｜分销商: 80.0%",
    startAt: "2026-08-13 20:18:24",
    endAt: "2027-08-15 20:18:26",
    modifiedAt: "2026-08-13 20:22:09",
    modifier: "wb_wangwenqi",
    isComic: false,
    ruleId: "—",
  },
];

const ruleText = `【任务类型】免费短剧-广告计费\n\n【任务介绍】\n基于短剧内容完成该短剧二创生产及引导用户点击短剧合集，具体形式包括混剪、解说等，生产若干二创内容。\n\n【结算说明】\n广告收入效果计费按照视频播放情况及用户在站内观看广告的效果进行作者计费。作者发布后的60天（含发布当日）内，该作品视为有效二创。\n\n【必选要求】\n1、创作者需带首话题#快来看短剧。\n2、内容需有明显二创痕迹，禁止搬运、抄袭、洗稿或大段拼接原片。`;

const restartBlockedReason = (task) => task.pauseReason === "PA转换" ? "旧版本已完成转换，任务不可重启" : "当前任务不可开启";

function Header() {
  return (
    <header className="header">
      <div className="brand-lockup"><img className="brand-logo" src={asset("kuaishou-short-drama-logo.png")} alt="快手短剧" /><i /><strong>内部管理平台</strong></div>
      <div className="operator">
        <img src={asset("operator-avatar.jpg")} alt="任泉睿" />
        <div><strong>任泉睿</strong><small>邮箱前缀：renquanrui</small></div>
      </div>
    </header>
  );
}

function Sidebar({ current, onChange }) {
  const menus = [
    ["plans", "计划列表"],
    ["tasks", "任务列表"],
    ["talents", "服务达人列表"],
    ["people", "个人达人管理"],
    ["blacklist", "达人黑名单"],
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-group"><AppstoreFilled /><strong>分销管理</strong><DownOutlined /></div>
      <nav>{menus.map(([key, label]) => <button key={key} className={current === key ? "active" : ""} onClick={() => onChange(key)}>{label}</button>)}</nav>
      <div className="sidebar-group muted"><SettingFilled /><strong>后台配置</strong><DownOutlined /></div>
      <div className="sidebar-group muted"><SearchOutlined /><strong>信息查询</strong><DownOutlined /></div>
      <div className="sidebar-group muted"><SettingFilled /><strong>短剧管理</strong><DownOutlined /></div>
      <div className="sidebar-group muted"><CompassFilled /><strong>新剧计划</strong><DownOutlined /></div>
      <MenuFoldOutlined className="sidebar-foot" />
    </aside>
  );
}

function Tabs({ value, onChange }) {
  return <div className="tabs"><button className={value === "drama" ? "active" : ""} onClick={() => onChange("drama")}>短剧</button><button className={value === "novel" ? "active" : ""} onClick={() => onChange("novel")}>小说</button></div>;
}

function StatusTag({ status }) {
  return <span className={`status-tag status-${status}`}>{status}</span>;
}

function Field({ label, children }) {
  return <div className="field"><dt>{label}</dt><dd>{children}</dd></div>;
}

function Filters({ type, values, onChange, onSearch, onReset }) {
  const update = (key) => (event) => onChange({ ...values, [key]: event.target.value });
  return (
    <div className={`filter-grid ${type === "tasks" ? "task-filters" : ""}`}>
      <label><span>{type === "plans" ? "计划ID" : "任务ID"}</span><input placeholder="请输入或搜索" value={values.id} onChange={update("id")} /></label>
      <label><span>计划名称</span><input placeholder="请输入或搜索" value={type === "plans" ? values.name : values.planName} onChange={update(type === "plans" ? "name" : "planName")} /></label>
      {type === "tasks" && <label><span>任务名称</span><input placeholder="请输入或搜索" value={values.name} onChange={update("name")} /></label>}
      {type === "plans" ? <>
        <label><span>版本名称</span><input placeholder="请选择或搜索" value={values.version} onChange={update("version")} /></label>
        <label><span>短剧名称</span><input placeholder="请选择或搜索" value={values.series} onChange={update("series")} /></label>
      </> : <>
        <label><span>版本名称</span><input placeholder="请选择或搜索" value={values.version} onChange={update("version")} /></label>
        <label><span>{values.tab === "novel" ? "小说名称" : "短剧名称"}</span><input placeholder="请选择或搜索" value={values.series} onChange={update("series")} /></label>
      </>}
      <label><span>{type === "plans" ? "计划状态" : "任务状态"}</span><select value={values.status} onChange={update("status")}><option value="">请选择状态</option>{(type === "plans" ? planStatusOptions : taskStatusOptions).map((status) => <option key={status}>{status}</option>)}</select></label>
      <label><span>{type === "plans" ? "计划发布时间" : "任务发布时间"}</span><div className="date-range"><input readOnly placeholder="开始日期" /><i>→</i><input readOnly placeholder="结束日期" /><CalendarOutlined /></div></label>
      {type === "tasks" && <label><span>任务来源</span><select value={values.source} onChange={update("source")}><option value="">请选择任务来源</option><option>手动创建</option><option>自动创建</option></select></label>}
      {type === "tasks" && <label><span>达人选择方式</span><select value={values.mode} onChange={update("mode")}><option value="">请选择达人选择方式</option><option>招募达人</option><option>指定达人</option><option>指定机构</option><option>指定服务商</option></select></label>}
      {type === "tasks" && values.tab === "drama" && <label><span>是否是漫剧</span><select value={values.comic} onChange={update("comic")}><option value="">请选择</option><option value="yes">是</option><option value="no">否</option></select></label>}
      <div className="filter-actions"><button className="text-button query" onClick={onSearch}><SearchOutlined />查询</button><button className="text-button" onClick={onReset}><ReloadOutlined />重置</button></div>
    </div>
  );
}

function MoreMenu({ open, onEdit, onEnd }) {
  if (!open) return null;
  return <div className="more-menu"><button onClick={onEdit}><EditOutlined />编辑</button><button onClick={onEnd}>结束</button></div>;
}

function PlanList({ plans, tasks, onView, onCreate, onAction, onEdit, menu, setMenu }) {
  const [tab, setTab] = useState("drama");
  const empty = { id: "", name: "", version: "", series: "", status: "", tab };
  const [filters, setFilters] = useState(empty);
  const [applied, setApplied] = useState(empty);
  const filtered = plans.filter((plan) => {
    const bindings = planBindings(plan);
    const assetNames = bindings.map((assetItem) => assetItem.name).join("、");
    const seriesNames = bindings.map((assetItem) => assetItem.seriesName).join("、");
    return (!applied.id || String(plan.id).includes(applied.id)) && (!applied.name || plan.name.includes(applied.name)) && (!applied.version || assetNames.includes(applied.version)) && (!applied.series || seriesNames.includes(applied.series)) && (!applied.status || plan.status === applied.status);
  });
  const switchTab = (next) => { setTab(next); setFilters({ ...empty, tab: next }); setApplied({ ...empty, tab: next }); };
  return (
    <section className="page list-page">
      <div className="page-heading"><h1>计划列表</h1><button className="dark-button" onClick={onCreate}><PlusOutlined />创建计划</button></div>
      <Tabs value={tab} onChange={switchTab} />
      <Filters type="plans" values={{ ...filters, tab }} onChange={setFilters} onSearch={() => setApplied(filters)} onReset={() => { setFilters({ ...empty, tab }); setApplied({ ...empty, tab }); }} />
      <div className="table-shell">
        <table className="data-table plan-table">
          <thead><tr><th className="check-cell"><input type="checkbox" aria-label="全选" /></th><th>计划名称&amp;ID</th><th>计划状态</th><th>短剧（部）</th><th>分账版本（个）</th><th>达人招募方式</th><th>最新修改人</th><th>分成比例</th><th>最新修改时间</th><th>计划创建时间</th><th>计划启动时间</th><th>计划结束时间</th><th>操作</th></tr></thead>
          <tbody>{filtered.length ? filtered.map((plan) => {
            const bindings = planBindings(plan);
            return <tr key={plan.id}>
              <td className="check-cell"><input type="checkbox" aria-label={`选择计划${plan.id}`} /></td>
              <td><strong className="truncate">{plan.name}</strong><small>ID: {plan.id}</small></td>
              <td><StatusTag status={plan.status} /></td>
              <td><strong>{bindings.length} 部</strong><small className="truncate">{bindings.map((item) => item.seriesName).join("、")}</small></td>
              <td><strong>{bindings.length} 个</strong><small className="truncate">{bindings.map((item) => item.name).join("、")}</small></td>
              <td>{plan.mode}</td><td>{plan.modifier}</td>
              <td>{plan.share.split("｜").map((line) => <span className="stack" key={line}>{line}</span>)}</td>
              <td>{plan.modifiedAt}</td><td>{plan.createdAt}</td><td>{plan.startAt}</td><td>{plan.endAt}</td>
              <td className="action-cell"><button onClick={() => onView(plan)}>查看</button>{plan.status === "进行中" && <button onClick={() => onAction("pause", plan)}>暂停</button>}{plan.status === "已暂停" && <button onClick={() => onAction("restart", plan)}>开启</button>}<span className="more-wrap"><button aria-label={`计划${plan.id}更多操作`} onClick={() => setMenu(menu === `plan-${plan.id}` ? null : `plan-${plan.id}`)}><EllipsisOutlined /></button><MoreMenu open={menu === `plan-${plan.id}`} onEdit={() => onEdit(plan)} onEnd={() => onAction("end", plan)} /></span></td>
            </tr>;
          }) : <tr><td className="empty-row" colSpan="13">暂无数据</td></tr>}</tbody>
        </table>
      </div>
      <Pagination total="100" />
    </section>
  );
}

function TaskList({ tasks, plans, onView, onAction, onEdit, menu, setMenu }) {
  const [tab, setTab] = useState("drama");
  const empty = { id: "", planName: "", name: "", version: "", series: "", status: "", source: "", mode: "", comic: "", tab };
  const [filters, setFilters] = useState(empty);
  const [applied, setApplied] = useState(empty);
  const filtered = tasks.filter((task) => {
    const versionName = assetById[task.assetId]?.name || "";
    return (!applied.id || String(task.id).includes(applied.id)) && (!applied.planName || task.planName.includes(applied.planName)) && (!applied.name || task.name.includes(applied.name)) && (!applied.version || versionName.includes(applied.version)) && (!applied.series || task.seriesName.includes(applied.series)) && (!applied.status || task.status === applied.status) && (!applied.source || task.source === applied.source) && (!applied.mode || task.mode === applied.mode) && (!applied.comic || (applied.comic === "yes") === task.isComic);
  });
  const switchTab = (next) => { setTab(next); setFilters({ ...empty, tab: next }); setApplied({ ...empty, tab: next }); };
  return (
    <section className="page list-page">
      <div className="page-heading"><h1>任务列表</h1></div>
      <Tabs value={tab} onChange={switchTab} />
      <Filters type="tasks" values={{ ...filters, tab }} onChange={setFilters} onSearch={() => setApplied(filters)} onReset={() => { setFilters({ ...empty, tab }); setApplied({ ...empty, tab }); }} />
      <div className="table-shell">
        <table className="data-table task-table">
          <thead><tr><th className="check-cell"><input type="checkbox" aria-label="全选" /></th><th>任务名称&amp;ID</th><th>任务状态</th><th>版本名称</th><th>{tab === "novel" ? "小说名称" : "短剧名称"}</th>{tab === "drama" && <th>是否漫剧</th>}<th>关联任务</th><th>分成比例</th><th>达人选择方式</th><th>任务来源</th><th>规则ID</th><th>计划名称</th><th>计划创建时间</th><th>任务启动时间</th><th>任务结束时间</th><th>任务修改时间</th><th>最新修改人</th><th>操作</th></tr></thead>
          <tbody>{filtered.length ? filtered.map((task) => {
            const plan = plans.find((item) => item.id === task.planId);
            const relatedTask = task.relatedTaskId ? tasks.find((item) => item.id === task.relatedTaskId) : null;
            return <tr key={task.id}>
              <td className="check-cell"><input type="checkbox" aria-label={`选择任务${task.id}`} /></td>
              <td><strong className="truncate">{task.name}</strong><small>ID: {task.id}</small></td>
              <td><StatusTag status={task.status} /></td><td>{assetById[task.assetId]?.name || "—"}</td><td>{task.seriesName}</td>{tab === "drama" && <td>{task.isComic ? "漫剧" : "真人剧"}</td>}
              <td>{relatedTask ? <button className="related-task-link" onClick={() => onView(relatedTask)}><strong>{task.relation}：{relatedTask.name}</strong><small>ID: {relatedTask.id}</small></button> : <span className="muted-text">—</span>}</td>
              <td>{task.share.split("｜").map((line) => <span className="stack" key={line}>{line}</span>)}</td><td>{task.mode}</td><td>{task.source}</td><td>{task.ruleId}</td><td>{task.planName}<small>{task.planId ? `ID: ${task.planId}` : "—"}</small></td><td>{plan?.createdAt || task.modifiedAt}</td><td>{task.startAt}</td><td>{task.endAt}</td><td>{task.modifiedAt}</td><td>{task.modifier}</td>
              <td className="action-cell"><button onClick={() => onView(task)}>查看</button>{task.status === "进行中" && <button onClick={() => onAction("pause", task)}>暂停</button>}{task.status === "已暂停" && <button disabled={!task.canRestart} className={!task.canRestart ? "disabled" : ""} title={task.canRestart ? undefined : restartBlockedReason(task)} onClick={() => onAction("restart", task)}>开启</button>}<span className="more-wrap"><button aria-label={`任务${task.id}更多操作`} onClick={() => setMenu(menu === `task-${task.id}` ? null : `task-${task.id}`)}><EllipsisOutlined /></button><MoreMenu open={menu === `task-${task.id}`} onEdit={() => onEdit(task)} onEnd={() => onAction("end", task)} /></span></td>
            </tr>;
          }) : <tr><td className="empty-row" colSpan={tab === "drama" ? 18 : 17}>暂无数据</td></tr>}</tbody>
        </table>
      </div>
      <Pagination total="90827" />
    </section>
  );
}

function Pagination({ total }) {
  return <div className="pagination"><button disabled>‹</button><button className="active">1</button><button>2</button><button>3</button><button>4</button><button>5</button><span>•••</span><button>{total}</button><button>›</button><select defaultValue="10"><option value="10">10 条/页</option><option value="20">20 条/页</option></select></div>;
}

function PlanDrawer({ plan, tasks, onClose, onTask }) {
  if (!plan) return null;
  const planTasks = tasks.filter((task) => task.planId === plan.id);
  const bindings = planBindings(plan);
  return <div className="overlay drawer-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <aside className="drawer">
      <div className="drawer-head"><button aria-label="关闭详情" onClick={onClose}><CloseOutlined /></button><h2>查看详情</h2></div>
      <div className="drawer-body">
        <dl className="drawer-fields"><Field label="计划ID">{plan.id}</Field><Field label="计划名称">{plan.name}</Field><Field label="分成比例">{plan.share.replace("｜", " ")}</Field><Field label="分销达人方式">{plan.mode}</Field><Field label="计划开始时间">{plan.startAt}</Field><Field label="计划结束时间">{plan.endAt}</Field><Field label="任务参与规则"><div className="drawer-rule"><div className="editor-toolbar"><b>B</b><i>I</i><u>U</u><UnorderedListOutlined /><OrderedListOutlined /><span>H₁</span><span>H₂</span><ClearOutlined /></div><pre>{plan.rule || ruleText}</pre></div></Field></dl>
        <h3>短剧及网盘链接</h3>
        <table className="drawer-table version-task-table">
          <thead><tr><th>短剧名称</th><th>任务状态</th><th>网盘链接（二创素材）</th><th>操作</th></tr></thead>
          <tbody>{bindings.map((assetItem) => {
            const currentTask = planTasks.find((item) => item.assetId === assetItem.assetId) || planTasks.find((item) => item.seriesId === assetItem.seriesId && item.pauseReason !== "PA转换");
            const material = plan.materials.find((m) => m.seriesId === assetItem.seriesId);
            return <tr key={assetItem.assetId}>
              <td><strong>{assetItem.seriesName}</strong><small>ID: {assetItem.seriesId}</small></td>
              <td>{currentTask ? <StatusTag status={currentTask.status} /> : "尚未生成"}</td>
              <td><span className="link-copy">{material?.link}</span></td>
              <td>{currentTask ? <button className="task-link" onClick={() => onTask(currentTask)}>查看任务</button> : "—"}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </aside>
  </div>;
}

function TaskDetail({ task, materialLink, onBack, onAction }) {
  return <section className="page detail-page">
    <button className="breadcrumb" onClick={onBack}>任务列表 <span>/</span> 任务详情</button>
    <div className="detail-heading"><h1>招募任务详情</h1><div>{task.status === "进行中" && <button className="light-button" onClick={() => onAction("pause", task)}>暂停</button>}{task.status === "已暂停" && <button className="dark-button" disabled={!task.canRestart} title={task.canRestart ? undefined : restartBlockedReason(task)} onClick={() => onAction("restart", task)}><PlayCircleOutlined />开启</button>}</div></div>
    <div className="detail-layout refactor-detail">
      <main>
        <dl className="detail-info"><Field label="任务ID">{task.id}</Field><Field label="任务名称">{task.name}</Field><Field label="任务发布时间">{task.modifiedAt}</Field><Field label="计划开始时间">{task.startAt}</Field><Field label="计划结束时间">{task.endAt}</Field><Field label="任务来源">{task.source}</Field><Field label="达人选择方式">{task.mode}</Field><Field label="分销达人">{task.mode}</Field><Field label="指定达人列表">—</Field><Field label="人群包列表">—</Field><Field label="指定机构列表">—</Field><Field label="指定服务商列表">—</Field><Field label="网盘链接"><span className="link-copy">{materialLink}</span></Field></dl>
        <h2 className="section-heading">招募短剧详情</h2>
        <div className="series-detail"><img src={asset("series-cover.jpg")} alt="神经侦探短剧封面" /><div><strong>{task.seriesName}</strong><div className="series-stats"><Field label="平均时长">2分钟</Field><Field label="短剧集数">11</Field><Field label="制片人">—</Field><Field label="短剧导演">—</Field><Field label="制作成本">26万</Field><Field label="制作机构">深圳市守亿影业有限公司</Field><Field label="短剧主演">万鑫、万鑫</Field><Field label="是否漫剧">{task.isComic ? "漫剧" : "真人剧"}</Field></div></div></div>
        <h2 className="section-heading">合作信息</h2>
        <div className="share-panel"><div><strong>70%</strong><span>分销商分成</span></div><div><strong>18%</strong><span>版权商分成</span></div></div>
        <h2 className="section-heading">活动规则</h2><pre className="rule-content">{task.rule || ruleText}</pre>
      </main>
    </div>
  </section>;
}

const sampleUploadRows = [
  { seriesId: "8274116", link: "https://pan.baidu.com/s/1uKuoNR4N-V3cbnXsR6BCmg?pwd=8888" },
  { seriesId: "8274109", link: "https://pan.baidu.com/s/demo-wuji?pwd=8888" },
  { seriesId: "8274208", link: "https://pan.baidu.com/s/demo-yin?pwd=8888" },
];

function MaterialLinkCell({ link, editable, onChange }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(link);
  useEffect(() => { setDraft(link); if (!editable) setEditing(false); }, [link, editable]);
  const commit = () => {
    const next = draft.trim() || link;
    onChange(next);
    setDraft(next);
    setEditing(false);
  };
  if (!editable) return <span className="link-copy">{link}</span>;
  if (editing) {
    return <input className="material-link-input" autoFocus value={draft} onChange={(event) => setDraft(event.target.value)} onBlur={commit} onKeyDown={(event) => { if (event.key === "Enter") commit(); if (event.key === "Escape") { setDraft(link); setEditing(false); } }} />;
  }
  return <div className="material-link-cell"><span className="link-copy">{link}</span><button type="button" className="material-link-edit" aria-label="编辑网盘链接" onClick={() => setEditing(true)}><EditOutlined /></button></div>;
}

function CreatePlan({ editing, onCancel, onSave }) {
  const isEditing = Boolean(editing);
  const initialSeriesIds = [...new Set((editing?.assetIds || []).map((assetId) => assetById[assetId]?.seriesId).filter((seriesId) => seriesById[seriesId]))];
  const [seriesSelectionMode, setSeriesSelectionMode] = useState(initialSeriesIds.length > 1 ? "multiple" : "single");
  const [talentMode, setTalentMode] = useState(editing ? editing.mode === "招募达人" ? "recruit" : "service" : "recruit");
  const [preview, setPreview] = useState(false);
  const [name, setName] = useState(editing?.name || "");
  const [selectedSeriesIds, setSelectedSeriesIds] = useState(initialSeriesIds);
  const [materialLinks, setMaterialLinks] = useState(Object.fromEntries((editing?.materials || []).map((material) => [material.seriesId, material.link])));
  const [rule, setRule] = useState(editing?.rule || ruleText);
  const isMultiple = seriesSelectionMode === "multiple";
  const showMaterialColumn = isEditing;
  const selectedSeries = selectedSeriesIds.map((seriesId) => seriesById[seriesId]).filter(Boolean);
  const selectedAssetIds = selectedSeriesIds.map((seriesId) => effectiveAssetBySeries[seriesId]?.assetId).filter(Boolean);
  const chooseSeriesIds = (seriesIds) => setSelectedSeriesIds(seriesIds.filter((seriesId) => effectiveAssetBySeries[seriesId]));
  const chooseSingleSeries = (seriesId) => chooseSeriesIds(seriesId ? [seriesId] : []);
  const applyUploadRows = (rows) => {
    const accepted = rows.filter((row) => effectiveAssetBySeries[row.seriesId]);
    chooseSeriesIds(accepted.map((row) => row.seriesId));
    setMaterialLinks((current) => ({ ...current, ...Object.fromEntries(accepted.map((row) => [row.seriesId, row.link])) }));
  };
  const onUploadFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    applyUploadRows(sampleUploadRows);
  };
  const clearSelectedSeries = () => chooseSeriesIds([]);
  return <section className="page create-page">
    <div className="breadcrumb-row"><button className="breadcrumb" onClick={onCancel}>分销计划列表</button><span>/</span><strong>{editing ? "编辑计划" : "创建计划"}</strong></div>
    <h1>{editing ? "编辑分销计划" : "创建分销计划"}</h1>
    <form className="online-form" onSubmit={(event) => { event.preventDefault(); onSave({ ...editing, name: name || "未命名分销计划", mode: talentMode === "recruit" ? "招募达人" : "指定服务商", assetIds: selectedAssetIds, materials: selectedSeries.map((series) => ({ ...series, link: materialLinks[series.seriesId] })), rule }); }}>
      <FormRow label="计划名称" required><input disabled={isEditing} placeholder="请输入计划名称" value={name} onChange={(e) => setName(e.target.value)} /></FormRow>
      <FormRow label="短剧选择方式" required><Radio disabled={isEditing} value="single" current={seriesSelectionMode} onChange={(mode) => { setSeriesSelectionMode(mode); if (mode === "single" && selectedSeriesIds.length > 1) chooseSeriesIds([selectedSeriesIds[0]]); }}>单个短剧</Radio><Radio disabled={isEditing} value="multiple" current={seriesSelectionMode} onChange={(mode) => { setSeriesSelectionMode(mode); if (!isEditing) clearSelectedSeries(); }}>多个短剧</Radio></FormRow>
      {seriesSelectionMode === "single" ? <FormRow label="选择分销短剧" required><select disabled={isEditing} value={selectedSeriesIds[0] || ""} onChange={(event) => chooseSingleSeries(event.target.value)}><option value="">请选择当前有生效分账版本的短剧</option>{seriesOptions.map((series) => <option key={series.seriesId} value={series.seriesId}>{series.seriesName}</option>)}</select>{isEditing && <small className="form-tip">计划创建后短剧范围不可变更；素材链接仍可维护</small>}</FormRow> : <FormRow label="选择分销短剧" required>{!isEditing && <label className="upload-button">批量上传<input type="file" accept=".xlsx,.xls,.csv" hidden onChange={onUploadFile} /></label>}{!isEditing && selectedSeries.length > 0 && <div className="selected-version-shell"><div className="selected-version-head"><span>已导入 {selectedSeries.length} 部短剧</span><button type="button" className="text-button" onClick={clearSelectedSeries}>清空</button></div><table className="selected-version-table"><thead><tr><th>短剧名称</th><th>网盘链接（二创素材）</th></tr></thead><tbody>{selectedSeries.map((series) => <tr key={series.seriesId}><td><strong>{series.seriesName}</strong><small>短剧 ID: {series.seriesId}</small></td><td><MaterialLinkCell link={materialLinks[series.seriesId]} editable={false} /></td></tr>)}</tbody></table></div>}{isEditing && <small className="form-tip locked-tip">计划创建后短剧范围不可变更；素材链接仍可维护</small>}</FormRow>}
      {isEditing && selectedSeries.length > 0 && <FormRow label="已选短剧及生效版本"><div className="selected-version-shell"><div className="selected-version-head"><span>已选择 {selectedSeries.length} 部短剧，将生成 {selectedAssetIds.length} 个任务</span>{!isEditing && <button type="button" className="text-button" onClick={clearSelectedSeries}>清空</button>}</div><table className={`selected-version-table series-version-table${showMaterialColumn ? " with-material" : ""}`}><thead><tr><th>短剧名称</th><th>当前生效分账版本</th>{showMaterialColumn && <th>网盘链接（二创素材）</th>}</tr></thead><tbody>{selectedSeries.map((series) => { const chosenAsset = effectiveAssetBySeries[series.seriesId]; const link = materialLinks[series.seriesId]; return <tr key={series.seriesId}><td><strong>{series.seriesName}</strong><small>短剧 ID: {series.seriesId}</small></td><td>{chosenAsset?.name || "—"}</td>{showMaterialColumn && <td><MaterialLinkCell link={link} editable={isEditing} onChange={(value) => setMaterialLinks({ ...materialLinks, [series.seriesId]: value })} /></td>}</tr>; })}</tbody></table></div></FormRow>}
      {!isMultiple && !isEditing && <FormRow label="网盘链接(二创素材)"><div className="material-editor">{selectedSeries.length ? selectedSeries.map((series) => <label className="material-editor-row" key={series.seriesId}><span><strong>{series.seriesName}</strong><small>ID: {series.seriesId}</small></span><input placeholder="请输入网盘链接" value={materialLinks[series.seriesId] || ""} onChange={(event) => setMaterialLinks({ ...materialLinks, [series.seriesId]: event.target.value })} /></label>) : <div className="material-empty">选择分销短剧后，填写素材链接</div>}</div></FormRow>}
      <FormRow label="计划时间" required><div className="form-date"><input disabled={isEditing} defaultValue={editing?.startAt || ""} placeholder="开始日期" /><span>→</span><input disabled={isEditing} defaultValue={editing?.endAt || ""} placeholder="结束日期" /><CalendarOutlined /></div></FormRow>
      <FormRow label="分成比例" required><div className="ratio-row"><input disabled={isEditing} type="number" defaultValue={editing ? parseFloat(editing.share.match(/达人机构:\s*([\d.]+)/)?.[1] || 70) : undefined} placeholder="请输入" /><b>%</b><span>达人机构</span><input disabled={isEditing} type="number" defaultValue={editing ? parseFloat(editing.share.match(/版权商:\s*([\d.]+)/)?.[1] || 18) : undefined} placeholder="请输入" /><b>%</b><span>版权商</span></div></FormRow>
      <FormRow label="分销达人选择方式" required><div className="radio-group"><Radio disabled={isEditing} value="recruit" current={talentMode} onChange={setTalentMode}>招募达人</Radio><Radio disabled={isEditing} value="talent" current={talentMode} onChange={setTalentMode}>指定达人</Radio><Radio disabled={isEditing} value="agency" current={talentMode} onChange={setTalentMode}>指定机构</Radio><Radio disabled={isEditing} value="service" current={talentMode} onChange={setTalentMode}>指定服务商（api 对接）</Radio></div></FormRow>
      {talentMode === "service" && <FormRow label="选择服务商" required><select disabled={isEditing}><option>请选择服务商</option><option>右豹</option><option>抖推猫</option></select></FormRow>}
      <FormRow label="任务参与规则"><div className="editor"><div className="editor-toolbar"><b>B</b><i>I</i><u>U</u><UnorderedListOutlined /><OrderedListOutlined /><span>H₁</span><span>H₂</span><ClearOutlined /></div><textarea value={rule} onChange={(e) => setRule(e.target.value)} placeholder="请输入规则" /></div><button type="button" className="preview-button" onClick={() => setPreview(true)}>点击预览</button></FormRow>
      <div className="form-buttons"><button className="dark-button" type="submit" disabled={!selectedAssetIds.length}>{editing ? "保 存" : "创 建"}</button><button className="light-button" type="button" onClick={onCancel}>取 消</button></div>
    </form>

    {preview && <div className="overlay modal-overlay"><div className="preview-modal"><button className="modal-x" onClick={() => setPreview(false)} aria-label="关闭"><CloseOutlined /></button><h2>规则预览</h2><pre>{rule || "暂无规则内容"}</pre><div><button className="light-button" onClick={() => setPreview(false)}>取 消</button><button className="dark-button" onClick={() => setPreview(false)}>确 定</button></div></div></div>}
  </section>;
}

function FormRow({ label, required, children }) { return <div className={`form-row ${required ? "required" : ""}`}><label>{label}</label><div className="form-control">{children}</div></div>; }
function Radio({ value, current, onChange, children, disabled = false }) { return <label className={`radio ${disabled ? "disabled-radio" : ""}`}><input disabled={disabled} type="radio" checked={current === value} onChange={() => onChange(value)} /><span />{children}</label>; }

function ConfirmModal({ config, onCancel, onConfirm }) {
  if (!config) return null;
  const noun = config.kind === "plan" ? "计划" : "任务";
  const copy = config.action === "pause" ? (config.kind === "plan" ? `暂停后计划内所有任务也将同步，确定暂停计划“${config.item.name}”吗？` : "确定暂停该任务吗？") : config.action === "restart" ? `确定开启该${noun}吗？` : (config.kind === "plan" ? `结束后计划内所有任务也将同步，确定结束计划“${config.item.name}”吗？` : "确定结束该任务吗？");
  return <div className="overlay modal-overlay"><div className="confirm-modal"><button className="modal-x" onClick={onCancel} aria-label="关闭"><CloseOutlined /></button><ExclamationCircleFilled /><p>{copy}</p><div><button className="light-button" onClick={onCancel}>取 消</button><button className="dark-button" onClick={onConfirm}>{config.action === "pause" ? "暂 停" : config.action === "restart" ? "开 启" : "结 束"}</button></div></div></div>;
}

function MaterialEditModal({ config, onCancel, onConfirm }) {
  const [value, setValue] = useState("");
  const [syncOtherPlans, setSyncOtherPlans] = useState(true);
  useEffect(() => { setValue(config?.link || ""); setSyncOtherPlans(true); }, [config]);
  if (!config) return null;
  return <div className="overlay modal-overlay">
    <form className="material-edit-modal" onSubmit={(event) => { event.preventDefault(); onConfirm(value.trim(), syncOtherPlans); }}>
      <button type="button" className="modal-x" onClick={onCancel} aria-label="关闭"><CloseOutlined /></button>
      <h2>修改网盘链接</h2>
      <div className="material-target"><span>短剧名称</span><strong>{config.seriesName}</strong></div>
      <label><span>网盘链接 (二创素材)</span><textarea autoFocus value={value} onChange={(event) => setValue(event.target.value)} placeholder="请输入网盘链接" /></label>
      <small>{config.planId ? "素材按短剧维度保存；同计划内该短剧的其他任务会同步使用此链接。" : "素材按当前任务所属短剧保存。"}</small>
      <label className="sync-material-option"><input type="checkbox" checked={syncOtherPlans} onChange={(event) => setSyncOtherPlans(event.target.checked)} /><span>同步更新其他计划中该短剧的素材链接</span></label>
      <div className="modal-actions"><button type="button" className="light-button" onClick={onCancel}>取 消</button><button type="submit" className="dark-button">确 定</button></div>
    </form>
  </div>;
}

function Toast({ message }) { return message ? <div className="toast">{message}</div> : null; }

export function App() {
  const [current, setCurrent] = useState("plans");
  const [plans, setPlans] = useState(initialPlans);
  const [tasks, setTasks] = useState(initialTasks);
  const [planDrawer, setPlanDrawer] = useState(null);
  const [detailTaskId, setDetailTaskId] = useState(null);
  const [materialEditor, setMaterialEditor] = useState(null);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [menu, setMenu] = useState(null);
  const [toast, setToast] = useState("");
  const detailTask = tasks.find((task) => task.id === detailTaskId) || null;
  useEffect(() => { window.scrollTo(0, 0); }, [current, detailTaskId, editing]);
  const notify = (message) => { setToast(message); window.clearTimeout(window.__ygToast); window.__ygToast = window.setTimeout(() => setToast(""), 2200); };
  const closeTaskDetail = () => { setDetailTaskId(null); setMaterialEditor(null); };
  const openTaskDetail = (task) => { setMenu(null); setDetailTaskId(task.id); };
  const navigate = (key) => { setMenu(null); if (["plans", "tasks"].includes(key)) { setCurrent(key); closeTaskDetail(); setPlanDrawer(null); setEditing(null); } else notify("该模块不在本次 Demo 范围内"); };
  const requestPlanAction = (action, item) => { setMenu(null); setConfirm({ action, item, kind: "plan" }); };
  const requestTaskAction = (action, item) => { setMenu(null); if (action === "restart" && !item.canRestart) return notify(restartBlockedReason(item)); setConfirm({ action, item, kind: "task" }); };
  const execute = () => {
    const nextStatus = confirm.action === "pause" ? "已暂停" : confirm.action === "restart" ? "进行中" : "已关闭";
    if (confirm.kind === "plan") {
      setPlans((items) => items.map((item) => item.id === confirm.item.id ? { ...item, status: nextStatus } : item));
      setTasks((items) => items.map((item) => {
        if (item.planId !== confirm.item.id || item.status === "已关闭") return item;
        if (confirm.action === "pause") {
          if (item.status === "已暂停" && !item.canRestart) return item;
          return { ...item, status: "已暂停", pauseReason: "运营暂停", canRestart: true };
        }
        if (confirm.action === "restart") {
          return item.status === "已暂停" && item.canRestart ? { ...item, status: "进行中", pauseReason: "—", canRestart: false } : item;
        }
        return { ...item, status: "已关闭", canRestart: false };
      }));
    } else {
      setTasks((items) => items.map((item) => item.id === confirm.item.id ? { ...item, status: nextStatus, pauseReason: confirm.action === "pause" ? "运营暂停" : confirm.action === "restart" ? "—" : item.pauseReason, canRestart: confirm.action === "pause" } : item));
    }
    notify(`${confirm.kind === "plan" ? "计划" : "任务"}已${confirm.action === "pause" ? "暂停" : confirm.action === "restart" ? "开启" : "结束"}`); setConfirm(null); setPlanDrawer(null);
  };
  const savePlan = (value) => {
    const modifiedAt = "2026-08-14 10:30:00";
    if (value.id) {
      setPlans((items) => items.map((item) => item.id === value.id ? { ...item, ...value, modifier: "renquanrui", modifiedAt } : item));
      setTasks((items) => items.map((task) => task.planId === value.id ? { ...task, planName: value.name, mode: value.mode, rule: value.rule, modifiedAt, modifier: "renquanrui" } : task));
      setEditing(null); setCurrent("plans"); notify("计划已保存");
      return;
    }
    const planId = Math.max(...plans.map((item) => item.id)) + 1;
    const taskId = Math.max(...tasks.map((item) => item.id)) + 1;
    const plan = {
      ...initialPlans[2],
      ...value,
      id: planId,
      status: "待启动",
      modifier: "renquanrui",
      createdAt: modifiedAt,
      modifiedAt,
    };
    const generatedTasks = value.assetIds.map((assetId, index) => {
      const assetItem = assetById[assetId];
      return {
        id: taskId + index,
        name: plan.name,
        status: "待启动",
        pauseReason: "—",
        canRestart: false,
        planId,
        planName: plan.name,
        seriesId: assetItem.seriesId,
        seriesName: assetItem.seriesName,
        assetId,
        seriesStatus: "已上架",
        relation: "—",
        relatedTaskId: null,
        source: "手动创建",
        sourceId: String(planId),
        mode: plan.mode,
        rule: plan.rule,
        share: plan.share.replace("达人机构", "分销商"),
        startAt: plan.startAt,
        endAt: plan.endAt,
        modifiedAt,
        modifier: "renquanrui",
        isComic: false,
        ruleId: "—",
      };
    });
    setPlans((items) => [plan, ...items]);
    setTasks((items) => [...generatedTasks, ...items]);
    setEditing(null); setCurrent("tasks"); notify(`计划创建成功，已为 ${generatedTasks.length} 部短剧生成任务`);
  };
  const saveTaskMaterial = (link, syncOtherPlans) => {
    const task = tasks.find((item) => item.id === materialEditor?.taskId);
    if (!task) return setMaterialEditor(null);
    const modifiedAt = "2026-08-14 10:35:00";
    if (task.planId || syncOtherPlans) {
      setPlans((items) => items.map((plan) => {
        const containsSeries = plan.assetIds.some((assetId) => assetById[assetId]?.seriesId === task.seriesId);
        const shouldUpdate = syncOtherPlans ? containsSeries : plan.id === task.planId;
        if (!shouldUpdate) return plan;
        const hasSeries = plan.materials.some((material) => material.seriesId === task.seriesId);
        const materials = hasSeries
          ? plan.materials.map((material) => material.seriesId === task.seriesId ? { ...material, link } : material)
          : [...plan.materials, { seriesId: task.seriesId, seriesName: task.seriesName, link }];
        return { ...plan, materials, modifiedAt, modifier: "renquanrui" };
      }));
    }
    if (!task.planId) {
      setTasks((items) => items.map((item) => item.id === task.id ? { ...item, materialLink: link } : item));
    }
    setTasks((items) => items.map((item) => item.id === task.id || (syncOtherPlans && item.seriesId === task.seriesId) ? { ...item, modifiedAt, modifier: "renquanrui" } : item));
    setMaterialEditor(null);
    notify(syncOtherPlans ? "网盘链接已更新，并同步到其他计划" : "网盘链接已更新");
  };
  const getTaskMaterialLink = (task) => task?.planId
    ? plans.find((plan) => plan.id === task.planId)?.materials.find((material) => material.seriesId === task.seriesId)?.link
    : task?.materialLink;
  const openMaterialEditor = (task) => {
    setMenu(null);
    setMaterialEditor({ taskId: task.id, planId: task.planId, seriesName: task.seriesName, link: getTaskMaterialLink(task) });
  };
  const detailMaterialLink = getTaskMaterialLink(detailTask);
  const page = detailTask
    ? <TaskDetail task={detailTask} materialLink={detailMaterialLink} onBack={closeTaskDetail} onAction={requestTaskAction} />
    : current === "create"
      ? <CreatePlan editing={editing} onCancel={() => { setEditing(null); setCurrent("plans"); }} onSave={savePlan} />
      : current === "plans"
        ? <PlanList plans={plans} tasks={tasks} onView={setPlanDrawer} onCreate={() => { setEditing(null); setCurrent("create"); }} onAction={requestPlanAction} onEdit={(item) => { setEditing(item); setCurrent("create"); setMenu(null); }} menu={menu} setMenu={setMenu} />
        : <TaskList tasks={tasks} plans={plans} onView={openTaskDetail} onAction={requestTaskAction} onEdit={openMaterialEditor} menu={menu} setMenu={setMenu} />;
  return <div className="app-shell" onClick={(event) => { if (!event.target.closest(".more-wrap")) setMenu(null); }}><Header /><Sidebar current={detailTask ? "tasks" : current === "create" ? "plans" : current} onChange={navigate} /><main className="content">{page}</main><PlanDrawer plan={planDrawer} tasks={tasks} onClose={() => setPlanDrawer(null)} onTask={(task) => { setPlanDrawer(null); openTaskDetail(task); }} /><ConfirmModal config={confirm} onCancel={() => setConfirm(null)} onConfirm={execute} /><MaterialEditModal config={materialEditor} onCancel={() => setMaterialEditor(null)} onConfirm={saveTaskMaterial} /><Toast message={toast} /></div>;
}
