<script>
  // import DOMPurify from 'isomorphic-dompurify';
  import snarkdown from 'snarkdown';
  import { createEventDispatcher } from 'svelte';
  import { session } from '$app/stores';
  import * as api from '$lib/shared/apis';
  import { pluralize } from '$lib/shared/helpers';
  import { aud } from '$lib/shared/stores';

  export let post,
    errors = [],
    success = '';

  const dispatch = createEventDispatcher();

  async function handleDestroy(post) {
    errors = [];
    const { response, json } = await api.del(
      $session.BASE_ENDPOINT,
      `posts/${post.id}`,
      {},
      { aud: $aud }
    );
    if (response.status === 200) {
      dispatch('destroy', post);
      success = json.meta.message;
    } else if (response.status === 401 || response.status === 404 || response.status === 406) {
      errors = [json.meta.message];
    } else if (response.status === 500) {
      errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
    }
  }
</script>

<div class="flex justify-between space-x-3">
  <div class="min-w-0 flex-1">
    <a href="/posts/{post.attributes.slug}" class="block focus:outline-none" sveltekit:prefetch>
      <p class="text-sm font-medium truncate text-gray-900 dark:text-white">
        {post.attributes.title}
      </p>
    </a>
    <div class="text-sm truncate text-gray-500 dark:text-gray-300">
      <a href="/users/{post.attributes.user.slug}" sveltekit:prefetch>
        Posted by {post.attributes.user.displayName}
      </a>
      <a
        href="/posts/{post.attributes.slug}/edit"
        class:hidden={$session.userId != post.attributes.user.id}
        on:click|preventDefault={() => {
          post.edit = !post.edit;
        }}>edit</a
      >
      <form
        class:hidden={$session.userId != post.attributes.user.id}
        class="inline dark:text-black"
        action="/posts/{post.id}?_method=delete"
        method="post"
      >
        <input
          type="submit"
          value="delete"
          class="cursor-pointer"
          on:click|preventDefault={handleDestroy(post)}
        />
      </form>
    </div>
  </div>
  <time
    datetime={post.attributes.publishedAt}
    class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
  >
    {post.attributes.publishedAt}
  </time>
</div>
<div class="mt-1">
  <p
    class="text-sm overflow-x-hidden cursor-pointer markdown text-gray-600 dark:text-gray-100"
    class:line-clamp-2={!post.expand}
    on:click|preventDefault={() => {
      post.expand = !post.expand;
    }}
  >
    {#if post.expand}
      <!-- {@html DOMPurify.sanitize(snarkdown(post.attributes.content))} -->
      {@html snarkdown(post.attributes.content)}
    {:else}
      <!-- {@html DOMPurify.sanitize(snarkdown(post.attributes.content.substring(0, 80)))} -->
      {@html snarkdown(post.attributes.content.substring(0, 80))}
    {/if}
  </p>
</div>
<div class="mt-1 text-sm text-gray-500 dark:text-gray-300">
  {pluralize('comment', post.attributes.commentsCount)}
</div>
