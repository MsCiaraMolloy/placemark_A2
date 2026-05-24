import { e as escape_html } from './escaping-CqgfEcN3.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { form } = $$props;
    $$renderer2.push(`<section class="section"><h1 class="title">Sign up</h1> `);
    if (form?.error) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="notification is-danger">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="box" style="max-width:480px;"><label class="label">Name</label> <div class="field is-horizontal"><div class="field-body"><div class="field"><input class="input" type="text" name="firstName" placeholder="First name" required=""/></div> <div class="field"><input class="input" type="text" name="lastName" placeholder="Last name" required=""/></div></div></div> <div class="field"><label class="label">Email</label> <input class="input" type="email" name="email" placeholder="Enter email" required=""/></div> <div class="field"><label class="label">Password</label> <input class="input" type="password" name="password" placeholder="Enter password" required=""/></div> <button class="button is-link">Submit</button></form></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-MtH610rq.js.map
