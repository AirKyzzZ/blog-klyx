# Git Workflow - Blog Klyx

## Branching Strategy

### Main Branches

**`main`** (Production)
- Always deployable
- Protected branch (no direct commits)
- Auto-deploys to blog.klyx.fr on Vercel
- Requires PR review before merge

**`develop`** (Staging) - Optional
- Integration branch for features
- Can be used for preview deployments
- Merge to main when ready for production

### Feature Branches

For new features or significant changes:

```bash
# Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/new-feature-name

# Work on your feature
git add .
git commit -m "feat: Add new feature"

# Push and create PR
git push origin feature/new-feature-name
```

### Content Branches

For adding/editing blog posts:

```bash
# Create content branch
git checkout -b content/article-slug

# Add your post
# Edit content/posts/article-slug.mdx

git add .
git commit -m "content: Add article about X"
git push origin content/article-slug

# Create PR on GitHub
```

---

## Commit Message Convention

Follow Conventional Commits standard:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks
- `content`: Blog content changes

### Examples

```bash
# Feature
git commit -m "feat(components): Add ShareButtons component"

# Bug fix
git commit -m "fix(layout): Fix mobile menu not closing"

# Content
git commit -m "content: Add guide about SEO local Bordeaux"

# Performance
git commit -m "perf(images): Optimize cover images to WebP"

# Documentation
git commit -m "docs: Update README with deployment instructions"
```

---

## Pull Request Workflow

### Creating a PR

1. **Push your branch** to GitHub
2. **Create Pull Request** on GitHub
3. **Fill PR template** (if exists):
   - Description of changes
   - Related issues
   - Screenshots (for UI changes)
   - Checklist completion

4. **Request review** from team members
5. **Vercel preview deploy** created automatically

### PR Review Checklist

Reviewer should verify:

- [ ] Code follows project conventions
- [ ] No linting errors
- [ ] Tests pass (if applicable)
- [ ] Mobile responsive (check Vercel preview)
- [ ] SEO tags present (for content)
- [ ] No console errors
- [ ] Accessibility maintained
- [ ] Performance not degraded

### Merging

1. **Squash and merge** (recommended) - Clean history
2. **Delete feature branch** after merge
3. **Automatic deployment** to production (main branch)

---

## Protecting Main Branch

### GitHub Branch Protection Rules

Settings → Branches → Add rule for `main`:

✅ **Require pull request before merging**
- Require approvals: 1
- Dismiss stale approvals

✅ **Require status checks**
- Vercel build must pass
- (Optional) Lighthouse CI must pass

✅ **Require conversation resolution**

✅ **Do not allow bypassing**

---

## Vercel Integration

### Automatic Deployments

**Production** (`main` branch):
- Trigger: Push to main or PR merge
- URL: https://blog.klyx.fr
- Environment: Production env vars

**Preview** (feature branches):
- Trigger: Push to any branch or PR creation
- URL: https://blog-klyx-{hash}.vercel.app
- Environment: Preview env vars
- Comment on PR with preview link

### Manual Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Rollback to previous deployment
vercel rollback
```

---

## Common Workflows

### Adding a Blog Post

```bash
# 1. Create content branch
git checkout main
git pull origin main
git checkout -b content/my-article-slug

# 2. Create post file
touch content/posts/my-article-slug.mdx
# Edit with your content

# 3. Add cover image
mkdir -p public/assets/posts/my-article-slug
# Add cover.jpg (1200x630px)

# 4. Commit
git add .
git commit -m "content: Add article about [topic]"

# 5. Push and create PR
git push origin content/my-article-slug
# Create PR on GitHub

# 6. Review Vercel preview
# 7. Merge to main when satisfied
```

### Hotfix (Urgent Bug)

```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue

# 2. Fix the bug
# Edit files

# 3. Commit and push immediately
git add .
git commit -m "fix: Fix critical issue with X"
git push origin hotfix/critical-issue

# 4. Create PR with "urgent" label
# 5. Merge ASAP after quick review
```

### Updating Multiple Posts

```bash
# 1. Create update branch
git checkout -b content/update-internal-links

# 2. Update multiple posts
# Edit files

# 3. Commit with descriptive message
git add .
git commit -m "content: Update internal linking strategy across 5 posts"

# 4. Push and create PR
git push origin content/update-internal-links
```

---

## Release Strategy

### Semantic Versioning

Blog uses calendar versioning based on content:

- **v2025.11** - November 2025 content
- **v2025.12** - December 2025 content

### Creating a Release

```bash
# Tag a release
git tag -a v2025.11 -m "November 2025 content release"
git push origin v2025.11
```

### Changelog

Maintain `CHANGELOG.md` with:
- New articles published
- Features added
- Bug fixes
- Performance improvements

---

## Backup Strategy

### Automated Backups

Vercel keeps deployment history automatically.

### Manual Backup

```bash
# Clone to backup location
git clone https://github.com/klyx-studio/blog-klyx.git blog-klyx-backup

# Or create backup branch monthly
git checkout -b backup/2025-11
git push origin backup/2025-11
```

### Content Backup

```bash
# Backup all posts monthly
tar -czf blog-posts-backup-2025-11.tar.gz content/
```

---

## Troubleshooting

### Merge Conflicts in Content

```bash
# 1. Update your branch
git checkout your-branch
git pull origin main

# 2. Resolve conflicts manually
# Edit conflicting files

# 3. Mark as resolved
git add .
git commit -m "chore: Resolve merge conflicts"
git push
```

### Reset to Last Working State

```bash
# See commit history
git log --oneline

# Reset to specific commit (soft - keeps changes)
git reset --soft abc123

# Reset to specific commit (hard - discards changes)
git reset --hard abc123
```

### Recover Deleted Branch

```bash
# Find commit
git reflog

# Recreate branch
git checkout -b recovered-branch abc123
```

---

## Team Collaboration

### Code Review Best Practices

**Reviewer**:
- Review within 24 hours
- Be constructive and specific
- Test the Vercel preview
- Approve or request changes clearly

**Author**:
- Keep PRs small and focused
- Respond to feedback promptly
- Update PR based on review
- Don't merge your own PRs

### Content Review

For blog posts:
- Check SEO (title, description, keywords)
- Verify internal links work
- Test mobile layout on preview
- Ensure Calendly CTAs present
- Validate frontmatter structure

---

## Emergency Procedures

### Site Down

```bash
# 1. Check Vercel status
# Visit Vercel dashboard

# 2. Rollback to last working deployment
vercel rollback

# 3. Investigate issue in safe environment
git checkout -b hotfix/investigate
```

### Broken Build

```bash
# 1. Check build logs in Vercel
# 2. Fix locally first
npm run build

# 3. Push fix
git add .
git commit -m "fix: Resolve build error"
git push
```

---

## Useful Commands

```bash
# See all branches
git branch -a

# Clean up old branches
git branch -d feature/old-feature
git push origin --delete feature/old-feature

# See file changes
git diff

# See commit history
git log --oneline --graph

# Stash changes temporarily
git stash
git stash pop

# Cherry-pick specific commit
git cherry-pick abc123
```

---

## Summary

- ✅ Use **feature branches** for all changes
- ✅ **Protect main** branch (no direct commits)
- ✅ Create **PRs** for all merges
- ✅ Use **conventional commits**
- ✅ Review **Vercel previews** before merging
- ✅ Keep **PRs small** and focused
- ✅ **Test locally** before pushing

**Questions?** Refer to this guide or contact the team lead.

